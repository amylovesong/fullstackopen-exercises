import { useState, useEffect } from "react"

const Countries = ({ countries }) => {
  console.log('Countries', countries);
  if (countries.length === 0) {
    return null
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return <CountryList countries={countries} />
  }

  return <CountryView country={countries[0]} />
}

const CountryList = ({ countries, onShowClick }) => {
  console.log('CountryList', countries);
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    console.log('CountryList effect');
    setCountryToShow(null) // reset state when search result changed
  }, [countries])

  const handleShowClick = (country) => {
    console.log('handleShowClick', country);
    setCountryToShow(country)
  }

  return <div>
    {countries.map(c => <div key={c.name.common}>
      {c.name.common}
      <button onClick={() => handleShowClick(c)}>show</button>
    </div>)}
    <CountryView country={countryToShow} />
  </div>
}

const CountryView = ({ country }) => {
  console.log('CountryView', country);
  if (!country) {
    return null
  }

  const imgStyle = {
    marginTop: 15
  }
  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>captical {country.capital ? country.capital[0] : ''}</div>
      <div>area {country.area}</div>

      <Languages languages={country.languages} />

      <img width={160} style={imgStyle} src={country.flags.png} />
    </div>
  )
}

const Languages = ({ languages }) => {
  const style = {
    fontSize: 14,
    paddingLeft: 30
  }

  return <>
    <h4>languages:</h4>
    {Object.values(languages).map(lan =>
      <li key={lan} style={style}>{lan}</li>
    )}
  </>
}

export default Countries
