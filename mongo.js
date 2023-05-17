const mongoose = require('mongoose')
const password = process.argv[2]
const url = `mongodb+srv://ghoshaldiwakar:${password}@learningcluster0.yrx0i94.mongodb.net/PhonebookApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)
const phoneBookSchema = new mongoose.Schema({
  name: String,
  phone: String,
})
const PhoneNumber = mongoose.model('PhoneNumber', phoneBookSchema)

if(process.argv.length<3){
  console.log('give password as an argument')
  process.exit(1)
}

if (process.argv.length === 3) {
  console.log('phonebook:')
  PhoneNumber.find({}).then((result) => {
    result.forEach((phone) => {
      console.log(phone.name + ' ' + phone.phone)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const phonenumber = new PhoneNumber({
    name: process.argv[3],
    phone: process.argv[4],
  })
  console.log(phonenumber.name)
  console.log(phonenumber.password)
  phonenumber.save().then((result) => {
    console.log(result)
    console.log(
      'added ' +
            phonenumber.name +
            'number ' +
            phonenumber.phone +
            ' to phonebook'
    )
    mongoose.connection.close()
  })
}

