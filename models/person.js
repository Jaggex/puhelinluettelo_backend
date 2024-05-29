require('dotenv').config()

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          const regex = /^(\d{2,3})-(\d{5,})$/
          if (!regex.test(v)) {
            return false
          }
          const parts = v.split('-')
          const totalLength = parts.join('').length
          return totalLength >= 8
        },
        message: props => `${props.value} is not a valid number.`
      }
    }
  });
  
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Person', personSchema)
  
