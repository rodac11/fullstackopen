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

const Persons = ({arr, deletePerson}) => {
    return(
	<div>
	    {arr.map((person) => (
		<li key={person.name}>
		    {person.name} {person.number}
		    <button onClick={() => deletePerson(person.id)}>delete</button>
		</li>
	    ))}
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
	personService
	    .getAll()
	    .then((initialPersons) => {
		setPersons(initialPersons)
	    })
    },[])   
	      
    
    const filterByName = (event) => {
	event.preventDefault()
    }


    const addName = (event) => {
	event.preventDefault()


	//check name
	if (persons.some(x => (x.name === newName))){

	    //check number as well
	    if(persons.some(y => (y.number === newNumber))){
		window.alert(`${newName} is already added to phonebook with number ${newNumber}`)
	    } else {
		
		if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
		    const toUpdate = persons.find(x => (x.name === newName))
		    toUpdate.number = newNumber
		    console.log(toUpdate)
		    personService
			.updateResource(toUpdate)
			.then(returnedPerson => {
			    setPersons(persons.map((oldPerson) =>
				oldPerson.name !== newName
				    ? oldPerson
				    : toUpdate
			    ))
			    })		 
		}
	    }
	    
	} else {
	    //add new person
	    //no id assign,
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

    const deletePerson = (id) => {
	personService
	    .deleteResource(id)
	    .then((deletedObject) => {
		setPersons(persons.filter((person) => person.id !== id))
	    })
	
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
	    <Persons arr={personsToShow}
		     deletePerson={deletePerson}
	    />
	</div>
    )
}

export default App
