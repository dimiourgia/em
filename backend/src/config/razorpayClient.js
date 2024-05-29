const Razorpay = require("razorpay");
require("dotenv").config();

const Razorpay_API_KEY = process.env.Razorpay_API_KEY;
const Razorpay_API_SECRET = process.env.Razorpay_API_SECRET;

const razorpay = new Razorpay({
  key_id: Razorpay_API_KEY,
  key_secret: Razorpay_API_SECRET,
});

module.exports = razorpay;
