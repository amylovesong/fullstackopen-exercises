import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const filteredResult = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  console.log('Books filteredResult:', filteredResult)

  if (result.loading || filteredResult.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data ? result.data.allBooks : []
  console.log('Books allBooks:', allBooks)

  const allGenres = Array.from(
    new Set(
      allBooks.reduce((pre, cur) => {
        return pre.concat(cur.genres)
      }, [])
    )
  )
  console.log('Books allGenres:', allGenres, 'genre:', genre)

  const books = filteredResult.data ? filteredResult.data.allBooks : []
  console.log('Books books:', books)

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
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
