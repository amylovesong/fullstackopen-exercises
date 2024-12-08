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

export default Persons
