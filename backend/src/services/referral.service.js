const User = require('../models/user.model.js');

const generateReferralCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
};

const handleReferral = async ({referreeId, referrerId, referralCode}) => {
    try{
        const referrer = await User.findById(referrerId);
        if (referrer) {
            const referralItem = referrer.referrals.find(item=>item.referralCode == referralCode);
            if(!referralItem) return {success: false, message: 'Invalid referral code'}

            const refereeAlreadyPresent = referralItem.referree.some(id=>id == referreeId);

            if(!refereeAlreadyPresent){
                if(referralItem.referree.count < 5){
                    referralItem.referree.push(referreeId);
                    referralItem.referralCount++;
                }
            }
        
            referrer.referralRewards += 5; // 5% for each referral
            await referrer.save();
            return {success: true, message: 'referral processed successfully' }
        }else{
            return {success: false, message: 'Invalid referral code'}
        }
    }catch(e){
        return {success: false, message: 'Something went wrong while processing this refferal code'}
    }
};

module.exports = {
    generateReferralCode,
    handleReferral
};
