const express = require("express");
const router = express.Router();

const cartService = require("../services/cart.service.js");
const findUserCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.findUserCart(user.id);
    res.status(200).json(cart);
  } catch (error) {
    // Handle error here and send appropriate response
    res
      .status(500)
      .json({ message: "Failed to get user cart.", error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const user = req.user;
    await cartService.addCartItem(user._id.toString(), req.body);
    res.status(202).json({ message: "Item Added To Cart Successfully", status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item to cart.", error: error.message, status: false });
  }
};

const applyCoupon = async (req, res)=>{
  try{
    const user = req.user;
    const couponId = req.body.couponId;
    await cartService.applyCoupon(user._id, couponId);
    res.status(202).json({message: "Coupon applied successfully", error:null, status: true});
  }catch(error){
    res.status(500).json({message: "Failed to apply coupon to cart", error: error.message, status:false});
  }
}


const removeCoupon = async (req, res)=>{
  try{
    const user = req.user;
    await cartService.removeCoupon(user._id);
    res.status(202).json({message: "Coupon removed successfully", error:null, status: true});
  }catch(error){
    res.status(500).json({message: "Failed to remove coupon from cart", error: error.message, status:false});
  }
}

module.exports = { findUserCart, addItemToCart, applyCoupon, removeCoupon };