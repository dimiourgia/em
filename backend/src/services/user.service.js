const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const jwtProvider=require("../config/jwtProvider")

const createUser = async (userData)=>{
    try {

        let {firstName,lastName,email,password,mobile,role}=userData;

        const isUserExist=await User.findOne({email});


        if(isUserExist){
            throw new Error("user already exist with email : ",email)
        }

        password=await bcrypt.hash(password,8);
    
        const user=await User.create({firstName,lastName,email,password,mobile,role})
        console.log("user ",user)
    
        return user;
        
    } catch (error) {
        console.log("error - ",error.message)
        throw new Error(error.message)
    }

}

const findUserById=async(userId)=>{
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new Error("user not found with id : ",userId)
        }
        return user;
    } catch (error) {
        console.log("error :------- ",error.message)
        throw new Error(error.message)
    }
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const getUserProfileByToken=async(token)=>{
    try {
        const userId=jwtProvider.getUserIdFromToken(token)
        console.log("userr id ",userId)
        const user= (await findUserById(userId))
        user.password=null;
        if(!user){
            throw new Error("user not exist with id : ",userId)
        }
        return user;
    } catch (error) {
        console.log("error ----- ",error.message)
        throw new Error(error.message)
    }
}

const getAllUsers=async()=>{
    try {
        const users=await User.find();
        return users;
    } catch (error) {
        console.log("error - ",error)
        throw new Error(error.message)
    }
}

const saveOtp = async (userId, otp) => {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);

    await User.findByIdAndUpdate(userId, {
        resetPasswordOtp: otp,
        resetPasswordOtpExpires: expiryDate,
    });
};

const updatePassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
        resetPasswordOtp: null,
        resetPasswordOtpExpires: null,
    });
};

module.exports={
    createUser,
    findUserById,
    getUserProfileByToken,
    getUserByEmail,
    saveOtp,
    updatePassword,
    getAllUsers
}