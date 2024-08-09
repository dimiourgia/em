const walletServices = require('../services/wallet.service.js');

const getUserWallet = async (req, res)=>{
    try{
        const user = req.user;
        const walletBalance = await walletServices.getUserWalletBalance(user.id);
        return res.status(200).json(walletBalance);
    } catch(e){
        return res.status(500).json({error: e.message,  message: 'Can not query user wallet at the moment', status: false});
    }
}

module.exports = {
    getUserWallet,
}