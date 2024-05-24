const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  },
]


app.get('/info', (request, response) => {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  let time = now.toLocaleString('en-FI', options)

  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <br/>
    <div>${time} GMT+0200 (Eastern European Standard Time)</div>
  `)
})



app.get('/api/persons', (request, response) => {
  response.json(persons)
})



app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})



app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})



app.post('/api/Persons', (request, response) => {
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  }

  const person = request.body
  if (!person.name || !person.number) {
    return response.status(400).json({ error: 'name and/or number missing' })
  }

  person.id = getRandomInt(6, 999999999999)
  persons = persons.concat(person)
  response.json(person)
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
