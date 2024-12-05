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
        // reset input
        setNewName('')
        setNewNumber('')
      })
  }

  const update = (changedPerson) => {
    phonebookService
      .update(changedPerson)
      .then(returnedData => {
        console.log('update fulfilled', returnedData);
        // update component state
        setPersons(persons
          .filter(p => p.id !== changedPerson.id) // filter out unchanged persons
          .concat(returnedData)) // add updated person
        // reset input
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => {
    // confirm() return value: true - OK, false - Cancel
    if (confirm(`Delete ${person.name} ?`)) {
      console.log('delete', person);
      phonebookService
        .deletePerson(person.id)
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
