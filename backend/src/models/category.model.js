const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 500,
  },

});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
