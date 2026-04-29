require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())

const Person = require('./models/person')
let persons = []

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
    Person.find({}).then(result => {
	console.log(result)
	response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => {
	response.json(person)
    })
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

    //"At this stage, you can ignore ..."
    if (persons.some(p => p.name === body.name)) {
	return response.status(409).json({
	    error: 'name must be unique'
	})
    }
    
    const person = new Person({
	id: generateId(),
	name: body.name,
	number: body.number,
    })
    
    persons = persons.concat(person)
    person.save().then(savedPerson => {   
	response.json(savedPerson)
    })
    
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id)
    Person.findByIdAndDelete(request.params.id)
	.then(result => {
	    response.status(204).end()
	})
	.catch(error => next(error))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
