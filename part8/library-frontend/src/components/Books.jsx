import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data ? result.data.allBooks : []
  console.log('allBooks:', allBooks)

  const allGenres = Array.from(
    new Set(
      allBooks.reduce((pre, cur) => {
        return pre.concat(cur.genres)
      }, [])
    )
  )
  console.log('allGenres:', allGenres, 'genre:', genre)

  const books = genre
    ? allBooks.filter(book => book.genres.includes(genre))
    : allBooks
  console.log('books:', books)

  return (
    <div>
      <h2>books</h2>
      {
        genre ? <div>in genre <b>{genre}</b></div> : null
      }
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
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
