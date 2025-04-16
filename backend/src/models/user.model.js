const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "CUSTOMER"
  },
  guid: {
    type: String,
    required: false,
  },
  referrals: [
    {
      referralCode: { type: String },
      orderId: { type: mongoose.Types.ObjectId },
      referree: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      referralCount: { type: Number, default: 0 },
    }
  ],

  referralRewards: { type: Number, default: 0 },
  googleId: { type: String },
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
  verifyAccountOtp: {
    type: String,
    default: null,
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  verifyAccountOtpExpires:
  {
    type: Date,
    default: null,
  },
  resetPasswordOtp: {
    type: String,
    default: null,
  },
  resetPasswordOtpExpires:
  {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

userSchema.index({ resetPasswordOtpExpires: 1 });

const User = mongoose.model("users", userSchema);
module.exports = User;
