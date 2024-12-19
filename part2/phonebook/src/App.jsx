import { useEffect, useState } from "react"
import phonebookService from "./services/phonebook"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWords, setSearchWords] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialData => {
        console.log('effect fulfilled:', initialData);
        setPersons(initialData)
      })
  }, [])
  console.log('render persons:', persons);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPersonOrUpdate = (event) => {
    event.preventDefault()
    const existed = persons.find(person => person.name === newName)
    console.log('existed:', existed);
    if (existed) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // select OK and update
        const changedPerson = {
          ...existed,
          number: newNumber
        }
        console.log('changedPerson', changedPerson);
        update(changedPerson)
      } else {
        console.log('confirm cancelled');
      }

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    addPerson(newPerson)
  }

  const addPerson = (newPerson) => {
    phonebookService
      .create(newPerson)
      .then(returnedData => {
        // update component state
        setPersons(persons.concat(returnedData))
        clearNewNumberInput()
        showSuccessfulNotification(`Added ${returnedData.name}`)
      })
  }

  const update = (changedPerson) => {
    phonebookService
      .update(changedPerson)
      .then(returnedData => {
        console.log('update fulfilled', returnedData);
        // update component state
        setPersons(persons
          .filter(p => p.id !== changedPerson.id) // filter out the changed person
          .concat(returnedData)) // add updated person
        clearNewNumberInput()
        showSuccessfulNotification(`Added ${returnedData.name}`)
      })
      .catch(error => {
        setError(`Information of ${changedPerson.name} has already been removed from server`)
        setTimeout(() => {
          setError(null) // reset error state
        }, 5000);
        setPersons(persons.filter(p => p.id !== changedPerson.id)) // filter out the deleted person
      })
  }

  const clearNewNumberInput = () => {
    setNewName('')
    setNewNumber('')
  }

  const showSuccessfulNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deletePerson = (person) => {
    // confirm() return value: true - OK, false - Cancel
    if (confirm(`Delete ${person.name} ?`)) {
      console.log('delete', person);
      phonebookService
        .deletePerson(person.id)
        .then(result => {
          console.log('delete fulfilled', result);
          setPersons(persons.filter(p => p.id !== person.id))
        })
    } else {
      console.log('delete cancelled');
    }
  }

  const handleSearchWordsChange = (event) => {
    setSearchWords(event.target.value)
  }

  const personsToShow = searchWords === ''
    ? persons
    : persons.filter(person =>
      person.name.toLocaleLowerCase().includes(searchWords.toLocaleLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} error={error} />

      <Filter onInputChange={handleSearchWordsChange} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={addPersonOrUpdate}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onDeleteClick={deletePerson} />
    </div>
  )
}

export default App
