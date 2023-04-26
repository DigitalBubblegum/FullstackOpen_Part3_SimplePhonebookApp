console.log('Starting the phonebook api server');
const express = require('express')
const app = express()
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    phone: "111111",
  },
  {
    id: 2,
    name: "Emma Johnson",
    phone: "222222",
  },
  {
    id: 3,
    name: "Michael Chen",
    phone: "333333",
  },
  {
    id: 4,
    name: "Sara Lee",
    phone: "444444",
  },
  {
    id: 5,
    name: "David Kim",
    phone: "555555",
  },
  {
    id: 6,
    name: "Sophie Martinez",
    phone: "666666",
  },
  {
    id: 7,
    name: "Jackie Wong",
    phone: "777777",
  },
  {
    id: 8,
    name: "Rahul Gupta",
    phone: "888888",
  },
  {
    id: 9,
    name: "Emily Thompson",
    phone: "999999",
  },
  {
    id: 10,
    name: "Nate Johnson",
    phone: "101010",
  },
  {
    id: 11,
    name: "Lila Rodriguez",
    phone: "111111",
  },
  {
    id: 12,
    name: "Mia Davis",
    phone: "121212",
  },
  {
    id: 13,
    name: "Ethan Brown",
    phone: "131313",
  },
  {
    id: 14,
    name: "Samantha Patel",
    phone: "141414",
  },
  {
    id: 15,
    name: "Maxwell Wilson",
    phone: "00000",
  },
  {
    id: 16,
    name: "Ava Garcia",
    phone: "161616",
  },
  {
    name: "Michael Scott",
    phone: "8977567567",
    id: 17,
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello Welcome to phonebook API please navigate to /api/persons for the phonenumbers</h1>");
});
app.get('/api/persons',(request,response)=>{
    response.json(persons)
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})