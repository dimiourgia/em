const mongoose = require("mongoose");

const couponModel = new mongoose.Schema({  
    userId: {type: mongoose.Types.ObjectId, required:true},   
    orderId: {type: mongoose.Types.ObjectId},
    code : { type: String, required: true },
    offer: {type: Number, required: true},
    usedForOrderId: {type: mongoose.Types.ObjectId},
    createdAt: {type: Date},
    usedAt: {type: Date},
    expirationDate: {type: Date}
});

const Coupon = mongoose.model("coupon", couponModel);
module.exports = Coupon;
