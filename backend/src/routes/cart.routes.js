const express=require("express");
const {authenticate, isAdmin} = require("../middleware/authenticat.js");
const router=express.Router();
const cartController=require("../controllers/cart.controller.js")

// GET: /api/cart
router.get("/", authenticate, cartController.findUserCart);

// PUT: /api/cart/add
router.put("/add", authenticate, cartController.addItemToCart);

//PUT: /api/cart/coupon
router.put("/coupon", authenticate, cartController.applyCoupon)

//delete: /api/cart/coupon
router.delete("/coupon", authenticate, cartController.removeCoupon)


module.exports=router;