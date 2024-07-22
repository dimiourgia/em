const express = require("express");
const router = express.Router();
const passport = require('../config/passport-google.js');
const authController = require("../controllers/auth.controller.js");

 router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', (req, res, next) => {
//     console.log('Google OAuth callback hit');
//     next();
// }, passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback);

// router.get('/google/callback', (req, res) => {
//     console.log('Google OAuth callback hit');
//     console.log('Request Query:', req.query);
//     res.send('Callback URL hit');
//  });

router.get('/google/callback', async (req, res, next) => {
    passport.authenticate('google', async (err, user, info) => {
        try{
            if (err) {
                console.error('Google OAuth callback error:', err);
                return res.redirect('/');
            }
            if (!user) {
                console.error('Google OAuth callback no user:', info);
                return res.redirect('/');
            }
            req.logIn(user, async (err) => {
                if (err) {
                    console.error('Google OAuth callback login error:', err);
                    return res.redirect('/');
                }
                console.log('Google OAuth callback successful, user:', user);
                //first create the user and get jwt
                const userData = {
                    firstName : user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    mobile: undefined,
                }
                const result = await authController.loginWithGoogle(userData);
                if(result.success){
                    return res.redirect(`http://localhost:5173/auth/google/callback?token=${result.jwt}`);
                }else throw new Error('Failed to generate jwt token')
                
            });
        }catch(e){
            console.log(e)
            return res.redirect('/')
        }
    })(req, res, next);
});


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), authController.facebookCallback);

router.post("/signup", authController.register);
router.post("/signin", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
