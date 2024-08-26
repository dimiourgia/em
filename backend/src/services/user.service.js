const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const jwtProvider=require("../config/jwtProvider");
const referralService  = require("../services/referral.service.js");
const walletService = require('../services/wallet.service.js');

// const createUser = async (userData)=>{
//     try {

//         let {firstName,lastName, email, password,role, referralCode}=userData;

//         const isUserExist=await User.findOne({email});


//         if(isUserExist){
//             throw new Error(`This email is already registered. Please login with your credentials.`)
//         }

//         password=await bcrypt.hash(password,8);
    
        

//         if (referralCode) {
//             const referrer = await User.findOne({ referralCode });

//             if (referrer) {
//                 const referralItem = referrer.referrals.find(item=>item.referralCode == referralCode);
//                 if(!referralItem) throw new Error('Invalid referral code');
    
//                 if(referralItem.referree.count < 5){ 
//                     //create user and award him 5% rewards           
//                     const user = await User.create({firstName,lastName,email,password,role, referralRewards:5})

//                     referralItem.referree.push(user._id);
//                     referralItem.referralCount++;
//                     referrer.referralRewards += 5; // 5% for each referral
//                     await referrer.save();
//                 }else{
//                     throw new Error('Refferal limit exceeded for this referral code');
//                 }

//                 return user;
//             }else{
//                 throw new Error('Could not process this refferal code')
//             } 
//         }

//         const user = await User.create({firstName,lastName,email,password,role})
//         console.log("user ",user)
    
//         return user;
        
//     } catch (error) {
//         console.log("error - ",error.message)
//         throw new Error(error.message)
//     }

// }

const createUser = async (userData) => {
    try {
      // Validate input data
      validateUserData(userData);
  
      const { firstName, lastName, email, password, role, referralCode } = userData;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error(`This email is already registered. Please login with your credentials.`);
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 8);
  
      // Handle referral code logic
      const user = referralCode ? await handleReferralCode(userData, hashedPassword) : await createNewUser(userData, hashedPassword);

      //create user wallet
      await walletService.creatUserWallet(user._id);
      console.log("User created:", user);

      return user;

    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new Error(error.message);
    }
  };
  
// Validate user data
const validateUserData = (data) => {
  const requiredFields = ["firstName", "lastName", "email", "password"];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
};

// Create new user without referral
const createNewUser = async (userData, hashedPassword) => {
  const { firstName, lastName, email, role } = userData;
  return await User.create({ firstName, lastName, email, password: hashedPassword, role });
};

// Handle referral code logic
const handleReferralCode = async (userData, hashedPassword) => {
  const { firstName, lastName, email, role, referralCode } = userData;
  const referrer = await User.findOne({ "referrals.referralCode": referralCode });

  if (!referrer) {
    throw new Error('Invalid referral code');
  }

  const referralItem = referrer.referrals.find(item => item.referralCode === referralCode);
  if (!referralItem) {
    throw new Error('Invalid referral code');
  }

  if (referralItem.referralCount >= 5) {
    throw new Error('Referral limit exceeded for this referral code');
  }

  // Create user and award referral rewards
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    referralRewards: 5,
  });

  // Update referrer
  await User.updateOne(
    { _id: referrer._id, "referrals.referralCode": referralCode },
    {
      $push: { "referrals.$.referrer": user._id },
      $inc: { "referrals.$.referralCount": 1, referralRewards: 5 },
    }
  );

  return user;
};

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

const saveVerificationOtp = async (userId, otp)=>{
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 15);

  await User.findByIdAndUpdate(userId, {
      verifyAccountOtp: otp,
      verifyAccountOtpExpires: expiryDate,
  });

}

const updatePassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
        resetPasswordOtp: null,
        resetPasswordOtpExpires: null,
    });
};

const getAdmins = async()=>{
  try{
    const admins = User.find({ role : 'ADMIN' });
    return admins;
  }catch(e){
    console.log(e);
    throw e;
  }
}


module.exports={
    createUser,
    findUserById,
    getUserProfileByToken,
    getUserByEmail,
    saveOtp,
    saveVerificationOtp,
    updatePassword,
    getAllUsers,
    getAdmins
}