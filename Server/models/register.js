const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUser = new Schema({
  name: String,
  password: String,
  email: String,
  phone: String,
  userId: String,
  rights: String,
  profileStatus: Boolean,
  data: Object
});

module.exports = mongoose.model('registeredUser', registerUser);
