const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  productId:{
    type: mongoose.Types.ObjectId,
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  modelAttireDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
  },
  collections: {
    type: String,
    required:true,
  }, 
  neck_type: {
    type: String,
    required: true,
  },
  sleeve_style: {
    type: String,
    required: true,
  },
  sizes: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 }
    }
  ],
  imageUrl: [
    {
      type: String,
      required: true,
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ratings',
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reviews',
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collections',
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
