const express = require("express");
var morgan = require("morgan");
const app = express();

morgan.token("mes", function getMes(request) {
  return JSON.stringify(request.body);
});
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :mes")
);
app.use(express.json());
// app.use(morgan)

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//functions
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

app.get("/info", (request, response) => {
  const length = persons.length;
  const currDate = new Date();
  console.log(currDate);
  response.send(
    `<p>phonebook has info for ${length} people</p><br><p>${currDate}</p>`
  );
});
//view all
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
//view by id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send("<h1>404 not found</h1>").end();
  }
});
//delete by id
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons.filter((person) => person.id != id);
  response.status(404).end();
  console.log("deleted");
});
//add a number
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else {
    const person = {
      id: getRandomIntInclusive(0, 1000000000000),
      name: body.name,
      number: body.number,
    };

    persons = persons.concat(person);
    response.json(person);
  }
});
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
// console.log(JSON.stringify(persons));
