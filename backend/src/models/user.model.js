const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  googleId: { type: String },
  role: {
    type: String,
    required: true,
    default: "CUSTOMER"
  },
  mobile: {
    type: String,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  paymentInformation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment_information",
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  resetPasswordOtp: {
    type: String,
    default: null,
  },
  resetPasswordOtpExpires:
  {
    type: Date,
    default: null,
  },
  hasMadeFirstPurchase: { type: Boolean, default: false }
},{
  timestamps: true,
});

userSchema.index({ resetPasswordOtpExpires: 1 });

const User = mongoose.model("users", userSchema);
module.exports = User;
