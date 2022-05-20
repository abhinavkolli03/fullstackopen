import {React} from 'react'
import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phoneService'
import SuccessPopup from './components/SuccessPopup'
import ErrorPopup from './components/ErrorPopup'
import { NULL } from 'mysql/lib/protocol/constants/types'

const App = () => {
  useEffect(() => {
    phoneService.getAll("http://localhost:3003/persons")
    .then(phoneContent => {
      setPersons(phoneContent)
    })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [applyFilter, setApplyFilter] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const validPeople = applyFilter ? persons.filter((p) => p.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  const handleSubmit = (event) => {
    event.preventDefault()
    const finding = persons.find((p) => p.name.toLowerCase() === newName.toLowerCase())
    if(finding && finding.number === newNumber) {
      window.confirm(`${finding.name} and ${finding.number} are alrady added to the phonebook.`)
    } 
    else if (finding && (finding.number !== newNumber)) {
      if(window.confirm(`${finding.name} is alrady added to the phonebook. Would you like to replace the old number with a new one?`)) {
        phoneService.update(finding.id, {name: newName, number: newNumber}).then(returnedContact => {
          setPersons(persons.map(personItem => personItem.id !== finding.id ? personItem : returnedContact))
        })
        setSuccessMessage(`Changed ${newName}'s phone number`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } 
    else {
      phoneService.create({name: newName, number: newNumber}).then(returnedContact => {
        setPersons(persons.concat(returnedContact))
      })
      setSuccessMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
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

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      phoneService.takeOut(id).then(returnedData => {
        console.log(returnedData)
        phoneService.getAll("http://localhost:3003/persons")
        .then(phoneContent => {
          setPersons(phoneContent)
        })
        setSuccessMessage(`Successfully deleted ${person.name}`)
      }).catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from server`)
      }) 
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessPopup successMessage={successMessage} />
      <ErrorPopup errorMessage={errorMessage} />
      <form>
        <Filter figureFilter={figureFilter}/>
        <h3>add a new</h3>
        <PersonForm changeName={(event) => {setNewName(event.target.value)}} 
          changeNumber={(event) => {setNewNumber(event.target.value)}}
          handleSubmit={handleSubmit}/>
      </form>
      <h3>Numbers</h3>
      <ul>
        {validPeople.map((person) => {
          return <Persons key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)}/>
        })}
      </ul>
    </div>
  )
}
export default App;