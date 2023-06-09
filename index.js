require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
///mongoose definitions:
const PhoneNumber = require('./models/phonenumber')
//
const errorHandler = (error,request,response,next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
morgan.token('mes', function getMes(request) {
  return JSON.stringify(request.body)
})
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :mes')
)
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

//functions

app.get('/info', (request, response) => {
  // eslint-disable-next-line no-undef
  const length = persons.length
  const currDate = new Date()
  console.log(currDate)
  response.send(
    `<p>phonebook has info for ${length} people</p><br><p>${currDate}</p>`
  )
})

//view all
app.get('/api/persons', (request, response) => {
  PhoneNumber.find({}).then(persons => {
    response.json(persons)
  })
})
//view by id
app.get('/api/persons/:id', (request, response,next) => {
  PhoneNumber.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => next(error))
})
//delete by id
app.delete('/api/persons/:id', (request, response,next) => {
  PhoneNumber.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result.message)
      console.log('deleted')
      response.status(204).end()
    })
    .catch(error => next(error))
})
//add a phonenumber to DB
app.post('/api/persons', (request, response,next) => {
  const body = request.body
  console.log(body)
  if (body.name===undefined) {
    return response.status(400).json({
      error: 'name missing',
    })
  }
  if (body.phone===undefined) {
    return response.status(400).json({
      error: 'phone missing',
    })
  }

  const person = new PhoneNumber({
    name: body.name,
    phone: body.phone,
  })
  person.save().then((savedNote) => {
    response.json(savedNote)
    console.log('note saved successfully')
  }).catch(error => next(error))
})

app.put('/api/persons/:id',(request,response,next) => {
  const { name,phone } = request.body

  PhoneNumber.findByIdAndUpdate(request.params.id,{ name,phone },{ new:true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
      console.log('success')
    })
    .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
// console.log(JSON.stringify(persons));

