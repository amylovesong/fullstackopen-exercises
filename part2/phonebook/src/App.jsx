import { useEffect, useState } from "react"
import phonebookService from "./services/phonebook"

const Filter = ({ onInputChange }) => <div>
  filter shown with<input onChange={onInputChange} />
</div>

const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) =>
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({ persons, onDeleteClick }) => <div>
  {persons.map(person =>
    <Person
      key={person.id}
      info={person}
      onDeleteClick={() => onDeleteClick(person)} />
  )}
</div>

const Person = ({ info, onDeleteClick }) => <div>
  {info.name} {info.number}
  <button onClick={onDeleteClick}>delete</button>
</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWords, setSearchWords] = useState('')

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

  const addName = (event) => {
    event.preventDefault()
    const existed = persons.filter(person => person.name === newName)
    console.log('existed:', existed);
    if (existed.length !== 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    phonebookService
      .create(newPerson)
      .then(returnedData => {
        // update component state
        setPersons(persons.concat(returnedData))
        // reset input
        setNewName('')
        setNewNumber('')
      })
  }

  const deleteName = (person) => {
    // confirm() return value: true - OK, false - Cancel
    if (confirm(`Delete ${person.name} ?`)) {
      console.log('delete', person);
      phonebookService
        .deleteName(person.id)
        .then(returnedData => {
          console.log('delete fulfilled', returnedData);
          setPersons(persons.filter(p => p.id !== returnedData.id))
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

      <Filter onInputChange={handleSearchWordsChange} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={addName}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onDeleteClick={deleteName}/>
    </div>
  )
}

export default App
