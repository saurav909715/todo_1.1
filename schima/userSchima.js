const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

// Corrected the schema name from 'userSchima' to 'userSchema'
const userSchema = new Schema({
  name: { type: String},
  email: { type: String}, // Added unique to email field
  password: { type: String}, // Optional field to handle admin
});

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin, // Admin flag, default false if not present
    },
    "lwdldm", // Secret key for signing token, use env variable in production
    {
      expiresIn: "30d", // Token expiration time
    }
  );
};

const User = model('DAY56', userSchema); // Changed model name to 'User' for clarity

module.exports = User;
