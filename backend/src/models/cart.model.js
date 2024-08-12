const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  cartItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cartItems',
    required: true,
  }],
  totalPrice: {
    type: Number,
    required: true,
    default:0
  },
  totalItem: {
    type: Number,
    required: true,
    default:0
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    default:0
  },
  discounte: {
    type: Number,
    required: true,
    default:0
  },
  referralDiscountPercentage:{
    type:Number,
    required:true,
    default:0,
  },
  referralDiscount:{
    type:Number,
    required:true,
    default:0,
  },
  referralDiscountNeeded:{
    type:Boolean,
    required:true,
    default:true,
  },
  couponId:{
    type: mongoose.Types.ObjectId,
  },
  couponDiscount:{
    type: Number,
    default: 0,
  },
  couponOffer:{
    type: Number,
    default: 0,
  },
  DateInfo: {
    type: Date,
    default: Date.now(),
    required: true,
  },
},{
  timestamps: true,
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
