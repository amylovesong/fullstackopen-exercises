import { useQuery } from "@apollo/client"
import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Recommendation = () => {
  const result = useQuery(ALL_BOOKS)
  const currentUser = useQuery(CURRENT_USER)

  if (result.loading || currentUser.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data ? result.data.allBooks : []
  console.log('allBooks:', allBooks)
  
  const favoriteGenre = currentUser.data ? currentUser.data.me.favoriteGenre : ''
  console.log('favoriteGenre:', favoriteGenre)

  const books = favoriteGenre
    ? allBooks.filter(book => book.genres.includes(favoriteGenre))
    : allBooks
  console.log('books:', books)

  return (
    <>
      <h3>recommendations</h3>
      <div>books in your favorite genre <b>{favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommendation;