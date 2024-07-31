const Address = require("../models/address.model.js");



async function getUserAddressByUserId(userId) {
    try{
      console.log('finding address for userId', userId)
      const addresses = await Address.find({ user: userId });
      if (!addresses) {
        throw new Error('Address not found for the give id');
      }

      return addresses;
    }catch(e){
      throw new Error('Internal Server Error');
    }
  }

module.exports = {
  getUserAddressByUserId
};