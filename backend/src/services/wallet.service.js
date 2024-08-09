const Wallet = require('../models/wallet.model.js');

const updateUserWalletBalance = async (userId, balance)=>{
    try{
        const wallet = await Wallet.findOne({userId});
        if(!wallet) throw new Error('Wallet not found for user');

        wallet.balance = balance;
        wallet.save();

    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const getUserWalletBalance = async (userId)=>{
    try{

        const wallet = await Wallet.findOne({userId});
        if(!wallet){
          const newWalet = await creatUserWallet({balance: 0, userId});
          return newWalet.balance;
        }

        return wallet.balance;

    }catch(e){
        console.log(e);
        throw e;
    }
  }

  const creatUserWallet = async (userId)=>{
    try{
        return await Wallet.create({balance: 0, userId});
    }catch(e){
        console.log(e);
        throw e;
    }
  }

  module.exports = {
    updateUserWalletBalance,
    getUserWalletBalance,
    creatUserWallet,
  }