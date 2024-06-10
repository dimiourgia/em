const express=require("express");
const  { authenticate, isAdmin } = require("../middleware/authenticat.js");
const router=express.Router();
const paymentController=require("../controllers/payment.controller.js");

router.post("/:id",authenticate,paymentController.createPaymentLink);
router.get("/",authenticate,paymentController.updatePaymentInformation);


module.exports=router;