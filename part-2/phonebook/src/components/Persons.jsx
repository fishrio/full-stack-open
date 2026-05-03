const Persons = ({persons, newFilter, handleDeletePerson}) => {
    return persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => <li key={person.id}>{person.name} {person.number} <button onClick={handleDeletePerson(person.id, person.name)} >delete</button></li>)
}

export default Persons