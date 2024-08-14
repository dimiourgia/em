const userService=require("../services/user.service.js")
const jwtProvider=require("../config/jwtProvider.js")
const bcrypt=require("bcrypt")
const cartService=require("../services/cart.service.js")
const otpService=require("../services/otp.service.js")
const emailService=require("../services/email.service.js")


const register=async(req,res)=>{

    try {
        const user=await userService.createUser(req.body);
        // const jwt=jwtProvider.generateToken(user._id);

        await cartService.createCart(user);
        const otp = otpService.generateOtp();
        await userService.saveVerificationOtp(user._id, otp);
        await emailService.sendAccountConfirmationEmail(user.email, otp);
        return res.status(200).send({message:"Successful! We have sent you a verification email.", emailSent: true});

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

        res.status(200).send({ message: "Please check your email; a link to reset your password has been sent." });
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

module.exports={ register, login, forgotPassword, resetPassword, verifyUser };