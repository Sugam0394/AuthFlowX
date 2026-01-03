 import { Router } from "express";
 import { createReview, getToolReviews, getAllReviews, updateReview, getMyReviewForTool, approveReview, rejectReview , deleteReview } from "../controllers/reviewControllers.js";
 import verifyJWT from "../middlewares/auth.js";
 import isAdmin from "../middlewares/isAdmin.js";
 
 
 
 

 const reviewRouter = Router();



// user hi tool reviews de sakta tool ko 
 reviewRouter.route('/create').post( verifyJWT, createReview)
 reviewRouter.route('/tool/:toolId').get(   getToolReviews )

// ab user apna review dekh paaye upadat ppaye
 reviewRouter.route("/my/:toolId").get(verifyJWT, getMyReviewForTool);

 reviewRouter.route("/update/:reviewId").put(verifyJWT, updateReview);



 



 // admin router
 reviewRouter.route('/admin/reviews').get( verifyJWT , isAdmin , getAllReviews)
 reviewRouter.route('/admin/reviews/:reviewId/approve').patch( verifyJWT , isAdmin , approveReview)
 reviewRouter.route('/admin/reviews/:reviewId/reject').patch( verifyJWT , isAdmin , rejectReview)
 reviewRouter.route('/admin/reviews/:reviewId/delete').delete( verifyJWT , isAdmin , deleteReview)

 export default reviewRouter