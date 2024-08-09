const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
    referralCode: { type: String, unique: true },
    referree:  {type: mongoose.Types.ObjectId},
    referrer: [{ type: mongoose.Types.ObjectId}],
    referralCount: { type: Number, default: 0 },
    orderId: {type: mongoose.Types.ObjectId}
});

const Referral = mongoose.model("referral", referralSchema);
module.exports = Referral;
