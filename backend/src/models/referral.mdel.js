const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
    referralCode: { type: String, unique: true },
    referree:  {type: mongoose.Schema.Types.ObjectId, ref:  'User'},
    referrer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    referralCount: { type: Number, default: 0 },
});

const referrals = mongoose.model("referral", referralSchema);
module.exports = referrals;
