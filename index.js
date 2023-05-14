require('dotenv').config()
const express = require("express");
var morgan = require("morgan");
const app = express();
///mongoose definitions:
  const PhoneNumber = require("./models/phonenumber")
  //
  morgan.token("mes", function getMes(request) {
    return JSON.stringify(request.body);
  });
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :mes")
);
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
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
  PhoneNumber.find({}).then(persons => {
    response.json(persons);
  })
});
//view by id
app.get("/api/persons/:id", (request, response) => {
  PhoneNumber.findById(request.params.id).then(person=>{
    response.json(person);
  }).catch(error =>{
    console.log(error);
    response.status(404).send("<h1>404 not found</h1>").end();
  }
    )
});
//delete by id
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons.filter((person) => person.id != id);
  response.status(204).end();
  console.log("deleted");
});
//add a phonenumber
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  if (body.name===undefined) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (body.phone===undefined) {
    return response.status(400).json({
      error: "phone missing",
    });
  }

  const person = new PhoneNumber({
    name: body.name,
    phone: body.phone,
  });
  person.save().then((savedNote) => {
    response.json(savedNote);
    console.log("note saved successfully");
  });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
// console.log(JSON.stringify(persons));
