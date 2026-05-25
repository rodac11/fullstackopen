//adding a comment to let me push 3.21 deploy
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
	response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then((person) => {
	if (person) {
	    response.json(person)
	} else {
	    response.status(404).end()
	}
    })
	.catch(error => next(error))
})


const generateId = () => {
    //one million ought to be enough...!
    return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response, next) => {
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
   // if (persons.some(p => p.name === body.name)) {
    //	return response.status(409).json({
//	    error: 'name must be unique'
//	})
//    }
    
    const person = new Person({
	id: generateId(),
	name: body.name,
	number: body.number,
    })
    
    persons = persons.concat(person)
    person.save().then(savedPerson => {   
	response.json(savedPerson)
    })
	.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findById(request.params.id)
	.then((person) => {
	    if(!person) {
		return response.status(404).end()
	    }

	    person.name = body.name
	    person.number = body.number

	    return person.save().then((updatedPerson) => {
		response.json(updatedPerson)
	    })
	})
	.catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
	.then(result => {
	    response.status(204).end()
	})
	.catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.find({}).then(result => {
	console.log(result.length)
	const tim = Date(Date.now()).toString()
	const str = `<p>Phonebook has info for ${result.length} people</p><p>${tim}`
	console.log(persons.length)
	console.log(Date(Date.now()))
	response.send(str)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
	return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
	return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
