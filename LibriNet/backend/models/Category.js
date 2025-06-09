<<<<<<< HEAD
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
=======
// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
>>>>>>> 6270e43a (added new file)
  description: String,
  image: String,
});

<<<<<<< HEAD
=======
// KJO ESHTE PJESA E RENDESISHME 👇
>>>>>>> 6270e43a (added new file)
module.exports = mongoose.model('Category', categorySchema);
