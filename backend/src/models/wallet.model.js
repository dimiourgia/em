const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    balance: 
    { 
        type: Number, 
        default: 0
    },
    userId:  
    {
        required: true,
        unique: true,type: mongoose.Types.ObjectId,
        
    }
});

const Wallet = mongoose.model("wallet", walletSchema);
module.exports = Wallet;
