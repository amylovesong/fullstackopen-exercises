import { useEffect, useState } from "react"
import axios from 'axios'

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

const Persons = ({ persons }) => <div>
  {persons.map(person =>
    <Person key={person.id} info={person} />
  )}
</div>

const Person = ({ info }) => <div>{info.name} {info.number}</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWords, setSearchWords] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('effect fulfilled:', response);
        setPersons(response.data)
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

    const url = 'http://localhost:3001/persons'
    const newPerson = {
      name: newName,
      number: newNumber
    }
    axios
      .post(url, newPerson)
      .then(response => {
        // update component state
        setPersons(persons.concat(response.data))
        // reset input
        setNewName('')
        setNewNumber('')
      })
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

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
