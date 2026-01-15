const express = require('express')
const app = express()


let persons = [
    { 
	"id": "1",
	"name": "Arto Hellas", 
	"number": "040-123456"
    },
    { 
	"id": "2",
	"name": "Ada Lovelace", 
	"number": "39-44-5323523"
    },
    { 
      "id": "3",
	"name": "Dan Abramov", 
	"number": "12-43-234345"
    },
    { 
	"id": "4",
	"name": "Mary Poppendieck", 
	"number": "39-23-6423122"
    }
]

app.use(express.json())


app.get('/', (request, response) => {
    response.send(
	'<h1>Hello World!</h1><p>The app is in /api/persons/ btw</p>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((p) => p.id === id)
    if (person) {
	response.json(person)
    } else {
	response.statusMessage = "There was no person found for the given id"
	response.status(404).end()
    }
})

const generateId = () => {
    //one million ought to be enough...!
    return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body) {
	return response.status(400).json({
	    error: 'nothing to post',
	})
    } else {
	const person = {
	id: generateId(),
	name: body.name,
	number: body.number,
    }	
	persons = persons.concat(person)
	response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((p) => p.id === id)
    if (person) {
	persons = persons.filter((p) => p.id !== id)
	response.status(204).end()
    } else {
	response.statusMessage = "Delete failed! The id given is not in the list."
	response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const tim = Date(Date.now()).toString()
    const str = `<p>Phonebook has info for ${persons.length} people</p><p>${tim}`
    console.log(persons.length)
    console.log(Date(Date.now()))
    response.send(str)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
