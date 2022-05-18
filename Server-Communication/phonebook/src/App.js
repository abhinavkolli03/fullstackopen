import logo from './logo.svg';
import './App.css';
import {React} from 'react'
import {useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [applyFilter, setApplyFilter] = useState(false)

  const validPeople = applyFilter ? persons.filter((p) => p.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  const handleSubmit = (event) => {
    event.preventDefault()
    const finding = persons.find((p) => p.name === newName)
    if(finding) {
      window.confirm(`${finding.name} is alrady added to the phonebook.`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }

  const figureFilter = (event) => {
    setNewFilter(event.target.value)
    if(newFilter.length !== 0) {
      setApplyFilter(true)
    } else {
      setApplyFilter(false)
    }
    console.log(newFilter)
    console.log(applyFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter figureFilter={figureFilter}/>
        <h3>add a new</h3>
        <PersonForm changeName={(event) => {setNewName(event.target.value)}} 
          changeNumber={(event) => {setNewNumber(event.target.value)}}
          handleSubmit={handleSubmit}/>
      </form>
      <h3>Numbers</h3>
      <Persons validPeople={validPeople} />
    </div>
  )
}
export default App;