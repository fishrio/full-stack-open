import { useState, useEffect } from 'react'
import personService from './services/personService'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setEMessage] = useState(null)

  // Fetch data using Effect-hook
  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons');
  
  const setMessageWith5sSpan = (message) => {
    setEMessage(message)
    setTimeout(() => {
      setEMessage(null)
    }, 5000)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleAddPerson = (event) => {
    event.preventDefault()

    // Check if it exists same name in persons
    const nameExists = persons.some((person) => person.name === newName)

    if(nameExists) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // Get id of already added person
        const id = persons.find(person => person.name === newName).id

        const updatedPersonObject = {
          name: newName,
          number:  newNumber,
          id: id
        }
        // update persons in backend server
        personService
          .update(id, updatedPersonObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.name === updatedPerson.name ? updatedPerson : person))
            setNewName('')
            setNewNumber('')
            setMessageWith5sSpan(`Changed number of ${updatedPerson.name}`)
          })
      }
      return
    } else {
      const personObject = {
        name: newName,
        number:  newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageWith5sSpan(`Added ${returnedPerson.name}`)
        })    
    }
  }
  const handleDeletePerson = (id, name) => {
    return () => {
      if(window.confirm(`Delete ${name} ?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(person => person.id != id))  
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson}
                  newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App