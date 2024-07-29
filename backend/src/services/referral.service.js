const User = require('../models/user.model.js');

const generateReferralCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
};

const handleReferral = async (referrerId) => {
    const referrer = await User.findById(referrerId);

    if (referrer) {
        referrer.referralCount += 1;
        referrer.referralRewards += 50; // Rs 50 for each referral
        await referrer.save();
    }
};

module.exports = {
    generateReferralCode,
    handleReferral
};
