const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () =>
      Book.collection.countDocuments(),
    authorCount: async () =>
      Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }

      if (args.author && args.genre) {
        const author = await Author.findOne({
          name: args.author
        })
        return Book.find({
          author: author._id,
          genres: args.genre
        }).populate('author')
      }

      if (args.author) {
        const author = await Author.findOne({
          name: args.author
        })
        return Book.find({
          author: author._id
        }).populate('author')
      }

      if (args.genre) {
        return Book.find({
          genres: args.genre
        }).populate('author')
      }
    },
    allAuthors: async () =>
      (await Author.find({})).map(async (author) => {
        const bookCount = (await Book.find({
          author: author._id
        })).length
        return {
          ...author._doc,
          bookCount
        }
      }),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      // save new author if needed
      let author = await Author.findOne({ name: args.author})
      console.log('author found:', author)
      if (!author) {
        const newAuthor = new Author({
          name: args.author
        })

        console.log('author to save:', newAuthor)
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError(`Saving author failed: ${error.message}`, {
            extension: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const newBook = new Book({
        ...args,
        author: author._id
      })
      console.log('book to save:', newBook)
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extension: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      const bookAdded = await Book.findOne({ _id: newBook._id }).populate('author')
      console.log('bookAdded:', bookAdded)
      pubsub.publish('BOOK_ADDED', { bookAdded })
      return bookAdded
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const author = await Author.findOne({
        name: args.name
      })
      try {
        author.born = args.setBornTo
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extension: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        ...args
      })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username
      })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET)
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers