import { useState } from "react"

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
      <div>
        filter shown with<input onChange={handleSearchWordsChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <div key={person.id}>{person.name} {person.number}</div>
        )}
      </div>
    </div>
  )
}

export default App
