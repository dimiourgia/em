const express = require("express");
const  { authenticate } = require("../middleware/authenticat.js");
const router = express.Router();
const couponController = require("../controllers/coupon.controller.js");

router.get("/", authenticate, couponController.getUserCoupons);


module.exports=router;