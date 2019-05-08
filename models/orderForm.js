const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = Schema({
  form: String,
  Color: String,
  Text: String,
  Email: String,
})

const Order = mongoose.model('Orders', orderSchema)

module.exports = Order
