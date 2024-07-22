const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 500,
  },
},{
  timestamps: true,
});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
