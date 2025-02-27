import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('useCountry useEffect name:', name)
    if (name.length > 0) {
      console.log('prepare to search for', name);
      const url = `https://restcountries.com/v3.1/name/${name}`
      axios
        .get(url)
        .then(response => {
          console.log('useEffect response.data:', response.data)
          setCountry(parseCountryInfo(response.data))
        })
        .catch(error => {
          console.log('fetch countries error', error)
          setCountry({
            found: false
          })
        })
    }
  }, [name])

  const parseCountryInfo = (countries) => {
    if (countries.length > 0) {
      const country = countries[0]
      return {
        found: true,
        data: {
          name: country.name.common,
          capital: country.capital ? country.capital[0] : '',
          population: country.population,
          flag: country.flags.png
        }
      }
    }

    return {
      found: false
    }
  }

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App