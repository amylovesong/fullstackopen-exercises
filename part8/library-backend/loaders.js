const DataLoader = require("dataloader")
const Book = require("./models/book")

const bookCount = new DataLoader(async (authorIds) => {
  // console.log('bookCount loader called with authorIds:', authorIds)
  const books = await Book.find({
    author: {
      $in: authorIds
    }
  })
  // console.log('books found:', books)

  return authorIds.map(authorId =>
    books.filter(b => b.author.toString() === authorId.toString()).length
  )
})


const loaders = {
  bookCount
}

module.exports = loaders