const Coupon = require('../models/coupon.model.js');
const { v4: uuidv4 } = require('uuid');

  const createUserCouponForOrder = async (userId, orderId)=>{
    try{
        
        const maxDiscount = 50;
        const code = await generateUniqueCouponCode();
        const offer = Math.floor(Math.random()*maxDiscount);
        const createdAt = new Date();
        const expirationDate = (()=>{
            const date = new Date();
            date.setDate(date.getDate() + 60);
            return date;
        })();

        return await Coupon.create({
            userId,
            orderId,
            code,
            offer,
            createdAt,
            expirationDate,
        });

    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const getUserCoupons = async (userId)=>{
    try{
        const coupons = await Coupon.find({userId});
        return coupons;
    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const availUserCouponForOrder = async (couponId, orderId)=>{
    try{
        const coupon = await Coupon.findOne({_id:couponId});
        coupon.usedForOrderId = orderId;
        coupon.usedAt = new Date();
        coupon.save();

    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const getCouponById = async (couponId)=>{
    try{
        const coupon = await Coupon.findOne({_id:couponId});
        return coupon;
    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const deleteCouponByOrderId = async (orderId)=>{
    try{
        const coupon = await Coupon.findOneAndDelete({orderId});
        return coupon;
    }catch(e){
        console.log(e);
        throw e;
    }
  }

  //utitlity function to generate Unique coupon codes
  async function generateUniqueCouponCode() {
    // Generate a unique code using UUID 
    console.log('generating referral code...')
    const couponCode =  uuidv4().slice(0, 8).toUpperCase(); // Shorten UUID for a simple referral code
    //check if coupon code exists
    const couponExists =  await Coupon.findOne({code:couponCode})

    //retry generating unique copuon code
    if(couponExists){
       return await generateUniqueCouponCode();
    }

    return couponCode;
  }

  module.exports = {
    createUserCouponForOrder,
    availUserCouponForOrder,
    getUserCoupons,
    getCouponById,
    deleteCouponByOrderId,
  }