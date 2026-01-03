import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
 
import Tool from "../models/toolmodel.js";
import User from "../models/usermodels.js";
import Review from "../models/reviewmodel.js";
 
import uploadCloudinary from "../utils/cloudinary.js";

const generateToken = async(adminId) => {
  try {
    // logic here
    const admin = await User.findById(adminId)
    const accessToken = admin.generateAccessToken()
     const refreshToken = admin.generateRefreshToken();

     admin.refreshToken = refreshToken

     await admin.save({validateBeforeSave : false})
     return { accessToken , refreshToken}
  } catch (error) {
    throw new ApiError(500 , 'something went wrong while generate token')
  }
}

const registerAdmin = asyncHandler(async(req , res) => {
const { name , email , password} = req.body

// validation
if(!name || !email || !password){
   throw new ApiError(400 , 'All fields are required')
}

  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

 //  check if admin exists
 const existedAdmin = await User.findOne({
   $or :[{email}]
 })

 if (existedAdmin) {
   throw new ApiError(409 , 'Admin with this email already exist')
 }

 // file handling
 let ImagePath = req.files?.profilePicture?.[0]?.path;

 let image = null;

 if (ImagePath) {
   image = await uploadCloudinary(ImagePath)
 }

 // create admin
 const user = await User.create({
   name,
   email,
   password,
   role : 'admin', // important
   profilePicture : image?.url || "",
 })


 const createdUser = await User.findById(user._id).select('-password -refreshToken');

 if (!createdUser) {
   throw new ApiError(500 , 'something went wrong while creating Admin' )
 }

 return res.status(201).json(
   new ApiResponse(201 ,{ user:  createdUser} ,'admin registered successfully')
 )

})
const loginAdmin = asyncHandler(async(req , res) => {

  // admin details
  const { email , password} = req.body;

  if(!email || !password){
    throw new ApiError(400 , 'email and password required')
  }

  // admin search
  const admin = await User.findOne({email, role: "admin" })

   if (!admin) {
    throw new ApiError(401 , 'Invalid user credentials')
  }

  if (admin.role !== "admin") {
  return res.status(403).json({ message: "Not an admin" });
}
  

  // password validation
  const isPasswordValid = await admin.comparePassword(password)

  if (!isPasswordValid) {
    throw new ApiError(401 , 'Invalid user credentials')
  }

  const {accessToken , refreshToken} = await generateToken(admin._id, admin.role) 

  const loggedInUser = await User.findById(admin._id).select('-password -refreshToken')
 
 const options = {
   httpOnly : true,
   secure : true
 }

  
 return res.status(200).cookie('accessToken' , accessToken , options)
 .cookie('refreshToken' , refreshToken , options)
 .json(new ApiResponse(200 , {admin : loggedInUser , accessToken , refreshToken } , "admin logged in successfully"))


})


const getAdminDashboardStats = async (req , res) => {
  try {
    const totalTools = await Tool.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user"});

    res.status(200).json({
      success: true,
      stats: {
        totalTools,
        totalReviews,
        totalUsers: await User.countDocuments({ role: "user" }),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

 

export  {
  registerAdmin , loginAdmin , getAdminDashboardStats,
  generateToken}