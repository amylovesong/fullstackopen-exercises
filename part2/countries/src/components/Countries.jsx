import { useState, useEffect } from "react"
import axios from 'axios'

const WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATER_MAP_API_KEY

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

  const [weather, setWeater] = useState(null)

  useEffect(() => {
    const [lat, lng] = country.latlng
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    axios
      .get(url)
      .then(response => {
        setWeater(response.data)
      })
  }, [country])

  const imgStyle = {
    marginTop: 15
  }
  const capital = country.capital ? country.capital[0] : ''
  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>captical {capital}</div>
      <div>area {country.area}</div>

      <Languages languages={country.languages} />

      <img width={160} style={imgStyle} src={country.flags.png} />

      <Weather city={capital} weather={weather} />
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

const Weather = ({ city, weather }) => {
  console.log('Weather city', city, 'weather', weather);
  if (!weather) {
    return null
  }

  return <div>
    <h3>Weather in {city}</h3>
    <div>temperature {weather.main.temp} Celsius</div>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    <div>wind {weather.wind.speed} m/s</div>
  </div>
}

export default Countries
