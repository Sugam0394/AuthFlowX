import asyncHandler from "../utils/asyncHandler.js";
 
import { Review } from "../models/reviewmodel.js";
import { Tool } from "../models/toolmodel.js";



// 1️⃣ Create Review (User)
  const createReview = asyncHandler(async (req, res) => {
  const { toolId, rating, comment } = req.body;

  const review = await Review.create({
    user: req.user._id,
    tool: toolId,
    rating,
    comment,
    status: "pending", // default
  });

  res.status(201).json({ success: true, data: review, message: "Review submitted, pending approval" });
});



// getTool Review
 const getToolReview = asyncHandler(async(req , res) => {
      const { toolId } = req.params;
  const reviews = await Review.find({ tool: toolId, status: "approved" }).populate("user", "name profilePicture");

  res.status(200).json({ success: true, data: reviews });
 })


 // update review  // Approve Review 
 const updateReview = asyncHandler(async(req , res ) => {
     const { reviewId } = req.params;
  const review = await Review.findByIdAndUpdate(reviewId, { status: "approved", admin: req.user._id }, { new: true });

  res.status(200).json({ success: true, data: review, message: "Review approved" });
     
 });


 // delete review
 const deleteReview = asyncHandler(async(req , res) => {


  const { reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ success: true, message: "Review deleted" });

})



 export{
  createReview , getToolReview , updateReview , deleteReview
 } 

