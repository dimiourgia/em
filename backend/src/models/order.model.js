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
    paymentId: {
      type: String,
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
  orderStatus: {
    type: String,
    required: true,
  },
  couponDiscount: { type: Number, default: 0 },
  totalItem: {
    type: Number,
    required: true,
  }
}, {
  timestamps: {
    type: Date,
    default: Date.now()
  }
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
