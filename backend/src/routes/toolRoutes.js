import { Router } from "express";
import { createTool } from "../controllers/toolController.js";
import verifyJWT from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getTool } from "../controllers/toolController.js";
import { updateTool } from "../controllers/toolController.js";
import { deleteTool } from "../controllers/toolController.js";
 import { getToolById } from "../controllers/toolController.js";
 

const toolRouter = Router();


 

// get single tool by id  // Public routes
toolRouter.route('/getTool/:id').get(verifyJWT , getTool)
// get all tools (Public)
toolRouter.route('/getAllTools/:id').get(verifyJWT , getToolById)


// admin Routes craete  update and delete Tools
toolRouter.route('/createTool').post(verifyJWT , isAdmin , createTool )
toolRouter.route('/updateTool/:id').patch(verifyJWT , isAdmin , updateTool )
toolRouter.route('/deleteTool/:id').delete(verifyJWT , isAdmin , deleteTool )
 

export default toolRouter