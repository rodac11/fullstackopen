const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())


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


morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
})
    
app.use(morgan(function (tokens, req, res) {
    return [
	tokens.method(req, res),
	tokens.url(req, res),
	tokens.status(req, res),
	tokens.res(req, res, 'content-length'), '-',
	tokens['response-time'](req,res), 'ms',
	tokens.body(req, res)
    ].join(' ')
})
)

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
    }
    if (!body.name) {
	return response.status(400).json({
	    error: 'missing name'
	})
    }
    if (!body.number) {
	return response.status(400).json({
	    error: 'missing number'
	})
    }
 
    if (persons.some(p => p.name === body.name)) {
	return response.status(409).json({
	    error: 'name must be unique'
	})
    }
    const person = {
	id: generateId(),
	name: body.name,
	number: body.number,
    }	
    persons = persons.concat(person)
    response.json(person)
    
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
