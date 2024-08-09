const express = require("express");
const  { authenticate } = require("../middleware/authenticat.js");
const router = express.Router();
const walletController = require("../controllers/wallet.controller.js");

router.get("/", authenticate, walletController.getUserWallet);


module.exports=router;