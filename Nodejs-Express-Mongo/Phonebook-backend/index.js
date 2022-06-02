const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

app.use(morgan((tokens, request, response) => {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, 'content-length'), '-',
      tokens['response-time'](request, response), 'ms',
      JSON.stringify(request.body)
    ].join(' ')
}))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Marian Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send("<h1>hi abhinav</h1>")
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if(!person) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    response.json(person)
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${currentDate}</p>
        </div>
    `)
})

app.delete(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateRandID = () => {
    const randID = persons.length > 0 ? Math.round(Math.random() * 100 + persons.length) : 0
    return randID + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name && !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if(persons.map(p => p.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateRandID(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

app.listen(3003)