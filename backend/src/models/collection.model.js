const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  products: [{type : mongoose.Types.ObjectId, ref:'products'}],

  imageUrl: [
    {
      type: String,
      required: true
    },
  ],
}, {
  timestamps: true,
});

const Collections = mongoose.model('collection', collectionSchema);

module.exports = Collections;
