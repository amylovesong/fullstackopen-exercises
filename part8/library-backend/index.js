const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

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
      })
  },
  Mutation: {
    addBook: async (root, args) => {
      // save new author if needed
      let author = await Author.findOne({ name: args.author})
      console.log('author found:', author)
      if (!author) {
        const newAuthor = new Author({
          name: args.author
        })

        console.log('author to save:', newAuthor)
        author = await newAuthor.save()
      }

      const newBook = new Book({
        ...args,
        author: author._id
      })
      console.log('book to save:', newBook)
      return newBook.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({
        name: args.name
      })
      if (!author) {
        return null
      }
      
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})