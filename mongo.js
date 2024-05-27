const mongoose = require('mongoose')


const password = process.argv[2]

const url =
  `mongodb+srv://jagge:${password}@puhelinluettelo.rtqv5kz.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phonenumber: String
})

const Person = mongoose.model('Person', personSchema);


if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.phonenumber}`);
    });
    mongoose.connection.close();
  })
} else if (process.argv.length > 3) {
  const name = process.argv.slice(3, -1).join(' ')
  const phonenumber = process.argv[process.argv.length - 1]

  const person = new Person({
    name: name,
    phonenumber: phonenumber
  })

  person.save().then(result => {
    console.log(`added ${name} number ${phonenumber} to phonebook`)
    mongoose.connection.close()
  })
}