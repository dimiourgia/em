const paymentService = require("../services/payment.service.js");

const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await paymentService.createPaymentLink(req.params.id);
    return res.status(200).send(paymentLink);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const updatePaymentInformation = async (req, res) => {
  try {
    const result = await paymentService.updatePaymentInformation(req.query);

    if(result.success){
      return res
      .status(200)
      .send({ message: "payment information updated", status: true });
    }else if(!result.success){
      return res
      .status(500)
      .send({ error: "Something went wrong. Please try again later", message: "Something went wrong. Please try again later", status: false });
    }
    
  } catch (error) { 
    return res.status(500).send({error: error.message, message: error.message});
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };