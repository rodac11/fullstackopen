import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'
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
    const [persons, setPersons] = useState([])
    const [filterList, setFilterList] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    //getAll
    useEffect(() => {
	console.log('effect')
	personService
	    .getAll()
	    .then((initialPersons) => {
		console.log('promise fulfilled')
		setPersons(initialPersons)
	    })
    },[])   
	      
    
    const filterByName = (event) => {
	event.preventDefault()
    }

    const addName = (event) => {
	event.preventDefault()
	if (persons.some(x => x.name === newName)){
	    window.alert(`${newName} is already added to phonebook`)
	} else {
	    //deleted id assign,
	    //'better to let the server generate ids for our resources' -- Part 2d Setting Data to the Server
	    const personObject = {name: newName,
				  number: newNumber,
				 }
	    personService
		.create(personObject)
		.then(returnedPerson => {
		    setPersons(persons.concat(returnedPerson))
		    setNewName('')
		    setNewNumber('')
		})
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
