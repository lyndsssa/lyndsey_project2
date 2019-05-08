const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = Schema({
  story: String
})

const Blog = mongoose.model('Blogs', blogSchema)

module.exports = Blog
