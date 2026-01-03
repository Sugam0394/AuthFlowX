import { Router } from "express";
import {registerAdmin , getAdminDashboardStats }from "../controllers/admincontroller.js";
import { loginAdmin } from "../controllers/admincontroller.js";
import upload from "../middlewares/multer.js";
import logout from "../controllers/logout.js";
import verifyJWT from "../middlewares/auth.js";
import generateToken from "../middlewares/generateToken.js";
import isAdmin from "../middlewares/isAdmin.js";
 
 
const adminRouter = Router();

adminRouter.route('/register').post(
    upload.fields([
    {
        name : 'profilePicture',
        maxCount : 1
    }
    ]),
registerAdmin
)
adminRouter.route('/login').post(loginAdmin)
adminRouter.route('/logout').post( verifyJWT , logout)
adminRouter.route('/refreshToken').post(generateToken)

adminRouter.route('/stats').get( verifyJWT , isAdmin, getAdminDashboardStats)


 



 




export default adminRouter