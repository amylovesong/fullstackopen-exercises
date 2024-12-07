import { useState, useEffect } from "react"
import axios from 'axios'
import Countries from "./components/Countries"

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect query:', query);
    if (query.length > 0) {
      console.log('prepare to search for', query);
      const url = `https://restcountries.com/v3.1/name/${query}`
      axios
        .get(url)
        .then(response => {
          setCountries(response.data)
        })
        .catch(error => {
          console.log('fetch countries error', error);
        })
    }
  }, [query])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      find countries<input onChange={handleQueryChange} />
      <Countries countries={countries} />
    </div>
  )
}

export default App
