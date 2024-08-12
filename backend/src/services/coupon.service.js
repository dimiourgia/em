const Coupon = require('../models/coupon.model.js');
const { v4: uuidv4 } = require('uuid');

  const createUserCouponForOrder = async (userId, orderId)=>{
    try{
        
        const maxDiscount = 50;
        const code = await generateUniqueCouponCode();
        const offer = nearestFive(Math.floor(Math.random()*maxDiscount));
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
        const coupon = await Coupon.findById(couponId);
        coupon.usedForOrderId = orderId;
        coupon.usedAt = new Date();
        coupon.save();

    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const restoreUserCouponForOrder = async (couponId, orderId)=>{
    try{
        const coupon = await Coupon.findById(couponId);
        coupon.usedForOrderId = null;
        coupon.usedAt = null;
        coupon.save();
    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const getCouponById = async (couponId)=>{
    try{
        const coupon = await Coupon.findById(couponId);
        if(!coupon) throw new Error('Coupon does not exist');
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

  //utitlity functions 
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

  //utility functions
  function nearestFive(num){
    try{
        if(num%5 == 0) return num;
        let multiplier = num/5;
        
        let nearestFive_floor = Math.floor(multiplier)*5;
        let nearestFive_ceil = Math.ceil(multiplier)*5;
        let diff_floor = num - nearestFive_floor;
        let diff_ceil = nearestFive_ceil - num;
        
        if(diff_floor < diff_ceil){
            if(nearestFive_floor == 0) return 5;
            return nearestFive_floor;
        };
        return nearestFive_ceil;
    }catch(e){
        return num;
    }
  }

  module.exports = {
    createUserCouponForOrder,
    availUserCouponForOrder,
    restoreUserCouponForOrder,
    getUserCoupons,
    getCouponById,
    deleteCouponByOrderId,
  }