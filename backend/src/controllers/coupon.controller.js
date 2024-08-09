const couponService = require('../services/coupon.service.js');


const getUserCoupons = async (req, res)=>{
    try{
        const user = req.user;
        const coupons = await couponService.getUserCoupons(user.id);
        return res.status(200).json(coupons);
    }catch(e){
        return res.status(500).json({error: e.message,  message: 'Can not query user coupons at the moment', status: false});
    }
}

module.exports = {
    getUserCoupons,
}