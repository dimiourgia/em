const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
  products: [{type : mongoose.Types.ObjectId, ref:'products'}],
}, {
  timestamps: true,
});

const Collections = mongoose.model('collection', collectionSchema);

module.exports = Collections;
