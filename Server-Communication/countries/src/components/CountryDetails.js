import {React} from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
    const languages = Object.values(country.languages)
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const params = {
          access_key: 'fd19366a71cf4e8ddaac860ab7856cf2',
          query: country.capital
        }
    
        axios.get(`http://api.weatherstack.com/current?${params}`)
          .then(response => {
            const apiResponse = response.data;
            setWeather(apiResponse)
            console.log(weather)
          })
    })

    if (weather.length > 0) {
        const currentWeather = weather[0].current
        return (
          <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h4>Languages</h4>
            <ul>
                {languages.map((lang, i) => {
                    return <li key={i}>{lang}</li>
                })}
            </ul>
            <img alt={country.name['common'] + " flag"} src={country.flags.png}></img>
            <h2>Weather in {country.name['common']}</h2>
            <p>temperature: {currentWeather.temperature}° Celcius</p>
            <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
            <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
          </div>
        )
    }
    

    return(
        <div>
            <h1>{country.name['common']}</h1>
            <p>capital: {country.capital[0]}</p>
            <p>area: {country.area}</p>
            <h4>Languages</h4> 
            <ul>
                {languages.map((lang, i) => {
                    return <li key={i}>{lang}</li>
                })}
            </ul>
            <img alt={country.name['common'] + " flag"} src={country.flags.png}></img>
        </div>
    )
}

export default CountryDetails;