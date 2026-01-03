import { Router } from "express";
import { createTool, getHomeTools, getRecommendedTools } from "../controllers/toolController.js";
import verifyJWT from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getTool } from "../controllers/toolController.js";
import { updateTool } from "../controllers/toolController.js";
import { deleteTool } from "../controllers/toolController.js";
 import { getToolById } from "../controllers/toolController.js";
 import { getAllToolsAdmin } from "../controllers/toolController.js";
    import { approveTool } from "../controllers/toolController.js";
    import { rejectTool } from "../controllers/toolController.js";
    import { getLiveToolsByUser } from "../controllers/userToolController.js";
import { isUser } from "../middlewares/isUser.js";
// import { getPopularTools, getCategories, getFeaturedTools } from "../controllers/toolController.js";
 import { getFeaturedTools, getPopularTools, getCategories } from "../controllers/toolController.js";

const toolRouter = Router();


 

// get single tool by id  // Public routes
toolRouter.route('/tools/:id').get( getToolById)
// get all tools (Public)
toolRouter.route('/tools/:id').get(verifyJWT , isAdmin, getTool)


// admin Routes craete  update and delete Tools
toolRouter.route('/createTool').post(verifyJWT , isAdmin , createTool )
toolRouter.route('/updateTool/:id').patch(verifyJWT , isAdmin , updateTool )









toolRouter.route('/deleteTool/:id').delete(verifyJWT , isAdmin , deleteTool )

// admin dashboard ke liya 
toolRouter.route('/admin/tools').get(verifyJWT , isAdmin , getAllToolsAdmin )

toolRouter.route('/admin/approveTool/:id').patch(verifyJWT , isAdmin , approveTool )
toolRouter.route('/admin/rejectTool/:id').patch(verifyJWT , isAdmin , rejectTool )










// user dashboard ke liya  tools get karne ka route
toolRouter.route('/tools').get( verifyJWT ,isUser, getLiveToolsByUser )



toolRouter.get("/popular" , getPopularTools )
toolRouter.get('/featured' , getFeaturedTools)
toolRouter.get('/categories' , getCategories)

toolRouter.get('/home', getHomeTools)

toolRouter.get('/recommeded' , getRecommendedTools)






 

export default toolRouter