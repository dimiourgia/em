const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderItems',
  }],
  OrderDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addresses',
  },
  paymentDetails: {

    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paymentId:{
      type:String,
    }
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
  },
  referralDiscountPercentage:{
    type:Number,
    required:true,
    default:0,
  },
  referralDiscountAvailed:{
    type: Boolean,
    required: true,
    default: false,
  },
  couponId: {
    type: mongoose.Types.ObjectId,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  totalItem: {
    type: Number,
    required: true,
  },
  referralCode:{
    type: String, 
  },
}
,{
  timestamps: {
    type : Date,
    default: Date.now()
  }
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
