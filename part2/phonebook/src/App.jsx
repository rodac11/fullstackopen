import { useState } from 'react'

const Filter = (props) => {
    return (
	<form onSubmit={props.onSubmit}>
	    <div>
		filter shown with <input value={props.value}
					 onChange={props.onChange}/>
	    </div>
	</form>
    )
    
}

const PersonForm = (props) => {
    return(
	<form onSubmit={props.onSubmit}>
	    <div>
		name: <input value={props.nameValue}
			 onChange={props.nameOnChange}/>
	    </div>
	    <div>
		number: <input value={props.numberValue}
			   onChange={props.numberOnChange}/>
	    </div>
	    <div>
		<button type="submit">add</button>
	    </div>
	</form>
    )
}

const Persons = ({arr}) => {
    return(
	<div>
	    {arr.map((person) => (
		<li key={person.name}> {person.name} {person.number}</li>))}
	</div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
    const [filterList, setFilterList] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const filterByName = (event) => {
	event.preventDefault()
    }

    const addName = (event) => {
	event.preventDefault()
	
	if (persons.some(x => x.name === newName)){
	    window.alert(`${newName} is already added to phonebook`)
	} else {
	    const newId = persons.length + 1
	    const personObject = {name: newName,
				  number: newNumber,
				  id: newId
				 }
	    setPersons(persons.concat(personObject))
	    setNewName('')
	    setNewNumber('')
	}
    }

    const handleNameChange = (event) => {
	setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
	setFilter(event.target.value)
    }

	const personsToShow = (filter === '')
	      ? persons
	      : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

    
    return (
	<div>
	    <h2>Phonebook</h2>
	    
	    <Filter onSubmit={filterByName}
		    value={filter}
		    onChange={handleFilterChange}
	    />
	    
	    <h3>add a new</h3>
	    
	    <PersonForm	onSubmit={addName}
			nameValue={newName}
			nameOnChange={handleNameChange}
			numberValue={newNumber}
			numberOnChange={handleNumberChange}
	    />
	    <h2>Numbers</h2>

	    <Persons arr={personsToShow}/>
	</div>
    )
}

export default App
