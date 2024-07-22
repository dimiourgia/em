const userService=require("../services/user.service.js")
const jwtProvider=require("../config/jwtProvider.js")
const bcrypt=require("bcrypt")
const cartService=require("../services/cart.service.js")
const otpService=require("../services/otp.service.js")
const emailService=require("../services/email.service.js")


const register=async(req,res)=>{

    try {
        const user=await userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return res.status(200).send({jwt,message:"register success"})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

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

        res.status(200).send({ message: "Please check your email; a link to reset your password has been sent." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const login = async (req,res)=>{
    const {password, email}=req.body
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found With Email ', email});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

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

const facebookCallback = (req, res) => {
    try {
        const token = jwtProvider.generateToken(req.user._id);
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    } catch (error) {
        console.error('Error in facebookCallback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports={ register, login, forgotPassword, resetPassword, facebookCallback, googleCallback, loginWithGoogle};