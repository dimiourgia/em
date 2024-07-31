const express=require("express");
const {authenticate, isAdmin} = require("../middleware/authenticat.js");
const router=express.Router();
const addressController=require("../controllers/address.controller.js")

// GET: /api/address/:id
router.get("/:id", addressController.findUserAddress);


module.exports=router;