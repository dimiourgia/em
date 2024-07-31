const addressService = require('../services/address.service.js');

const findUserAddress = async (req, res) => {
    try {
      if(!req.params.id){
        throw new Error({error: 'id not provided'});
      }
      const address = await addressService.getUserAddressByUserId(req.params.id);
      return res.status(200).send(address);
    } catch (error) {
      res.status(500).send({ error: error.message??"Something went wrong" });
    }
  };

module.exports = {
    findUserAddress
}