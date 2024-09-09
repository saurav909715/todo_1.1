const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

// Corrected the schema name from 'userSchima' to 'userSchema'
const todoSchima = new Schema({
  email: { type: String},
  text : {
    type: String,
  }// Optional field to handle admin
});



const Todos = model('TodoSchima', todoSchima); // Changed model name to 'User' for clarity

module.exports = Todos;
