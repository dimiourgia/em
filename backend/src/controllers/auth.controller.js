const userService=require("../services/user.service.js")
const jwtProvider=require("../config/jwtProvider.js")
const bcrypt=require("bcrypt")
const cartService=require("../services/cart.service.js")
const otpService=require("../services/otp.service.js")
const emailService=require("../services/email.service.js")
const { OAuth2Client } = require('google-auth-library');

const clientId = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(clientId);

const register=async(req,res)=>{

    try {
        const user=await userService.createUser(req.body);
        // const jwt=jwtProvider.generateToken(user._id);

        await cartService.createCart(user);
        const otp = otpService.generateOtp();
        await userService.saveVerificationOtp(user._id, otp);
        await emailService.sendAccountConfirmationEmail(user.email, otp);
        return res.status(200).send({message:"Successful! We have sent you a verification email.", emailSent: true});

        //temporary arrangement in absence of email service
        // const jwt=jwtProvider.generateToken(user._id);
        // user.accountVerified = true;

        //return res.status(200).send({jwt, message:"Successful! Registration successful", emailSent: true});

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        
        const otp = otpService.generateOtp();
        await userService.saveOtp(user._id, otp);

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?email=${encodeURIComponent(email)}&otp=${otp}`;
        await emailService.sendResetPasswordEmail(email, resetLink);

        res.status(200).send({ message: "Please check your email. A link to reset your password has been sent." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const login=async(req,res)=>{
    const {password,email}=req.body
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found With Email ', email});
        }

        if(!user.accountVerified) return res.status(403).json({message: 'Please vefiy your account first'});

        // if(!user.accountVerified){
        //     return res.status(401).json({message: 'Please verify your email first'});
        // }

        const isPasswordValid=await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password' });
        }

        const jwt=jwtProvider.generateToken(user._id);

        return res.status(200).send({jwt,message:"login success"});

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).send({ error: "Passwords do not match" });
        }

        const user = await userService.getUserByEmail(email);
        if (!user || user.resetPasswordOtp !== otp || new Date() > user.resetPasswordOtpExpires) {
            return res.status(400).send({ error: "Invalid or expired OTP" });
        }

        await userService.updatePassword(user._id, newPassword);

        res.status(200).send({ message: "Password has been reset successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const verifyUser = async (req, res)=>{
    const { email, otp } = req.query;
    console.log(req.params, 'params');
    if(!email || !otp) return res.status(400).json({message: 'Invalid email or otp', error: 'Invalid email or otp'});
    
    const user = await userService.getUserByEmail(email);
    console.log(user, 'user..', email, otp)
    
    if(!user) return res.status(404).json({message: 'Email not registered', error: 'Email not registered'});

    //later check expiration date as well
    if(user.verifyAccountOtp != otp) return res.status(400).json({message: 'Invalid OTP', error: 'Invalid OTP'});

    //everything look okay.. proceed to verify
    user.accountVerified = true;
    user.save();

    return res.status(200).json({message: 'Account Verified', error: null});
}

const googleCallback = (req, res) => {
    try {
        const token = jwtProvider.generateToken(req.user._id);
        console.log('Generated token:', token);
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    } catch (error) {
        console.error('Error in googleCallback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const loginWithGoogle = async(userData)=>{
    //usr => {firstName, lastName, email, password, mobile, role},
    try{
        //check if the user exists
        const user_ = await userService.getUserByEmail(email);

        if (user_) {
            const jwt = jwtProvider.generateToken(user._id);
            return {success: true, jwt};
        }

        const user = await userService.createUser(userData);
        const jwt = jwtProvider.generateToken(user._id);
        await cartService.createCart(user);
        return {success:true, jwt};

    }catch(e){
        console.log(e);
        return {success: false, jwt:null}
    }
}

const verifyGoogleUser = async(req, res)=>{
    try{
        const token = req.body.idToken
        console.log(token, 'token from google signin in request');
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        console.log(payload, 'payload after processing...');
        //get user info
        const email = payload.email;
        const firstName = payload.given_name;
        const lastName = payload.family_name;
        const guid = payload.sub;
        const verifiedEmail = payload.email_verified;

        const user_ = await userService.getUserByGoogleId(guid);

        if (user_) {
            const jwt = jwtProvider.generateToken(user_._id);
            return res.status(200).json({success: true, jwt});
        }else{
            //see if email is registered
            if(await userService.getUserByEmail(email)) return res.status(403).json({success: false, error: 'Email already registered. Please login with your credentials'})
            //create and return new user
            const user = await userService.createGoogleUser({email, firstName, lastName, guid, verifiedEmail});
            await cartService.createCart(user);
            const jwt = jwtProvider.generateToken(user._id);
            return res.status(200).json({success: true, jwt});
        }
    }catch(e){
        res.status()
        console.log(e);
    }

}

module.exports={ register, login, forgotPassword, resetPassword, verifyUser, loginWithGoogle, googleCallback, verifyGoogleUser };