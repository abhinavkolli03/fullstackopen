import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [listCountries, setListCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
    .then(response => {
      setListCountries(response.data)
    })
  })

  const changingFilter = (event) => {
    setNewCountry(event.target.value)
  }

  const filteringCountries = listCountries.filter(country => {
    return country.name.common.toLowerCase().includes(newCountry.toLowerCase());
  });

  const displayOverflow = filteringCountries.length > 10;
  const displayList = filteringCountries.length <= 10 && filteringCountries.length > 1;
  const displayCountry = filteringCountries.length === 1;

  return(
    <div>
      <div>
        find countries <input onChange={changingFilter}/> 
      </div>
      {displayList && filteringCountries.map((country) => {
        return(
          <div>
            <p key={country.alpha3Code}>{country.name.common}</p>
          </div>
        )
      })}
      {displayOverflow && <p>Too many matches, specify another filter</p>}
      {displayCountry && <CountryDetails country={filteringCountries[0]} />}
    </div>
  )
}

export default App;
