const express=require("express");

const router=express.Router();
const authController=require("../controllers/auth.controller.js")


router.post("/signup",authController.register)
router.post("/signin",authController.login)

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/verify", authController.verifyUser);
router.post('/google-signin', authController.verifyGoogleUser);

module.exports=router;