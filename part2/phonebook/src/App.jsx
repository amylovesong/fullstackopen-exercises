import { useState } from "react"

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWords, setSearchWords] = useState('')

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
    if (existed.length != 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    // reset
    setNewName('')
    setNewNumber('')
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
