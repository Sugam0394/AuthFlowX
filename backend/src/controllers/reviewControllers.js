import asyncHandler from "../utils/asyncHandler.js";
 
import { Review } from "../models/reviewmodel.js";
import { Tool } from "../models/toolmodel.js";




/* ======================================================
   USER CONTROLLERS
====================================================== */

 // 1️⃣ Create Review (User)
  const createReview = asyncHandler(async (req, res) => {
  const { toolId, rating, comment } = req.body;

  // check tool exists
  const tool = await Tool.findById(toolId);
  if (!tool) {
    return res.status(404).json({
      success: false,
      message: "Tool not found",
    });
  }

  // prevent duplicate review
  const existingReview = await Review.findOne({
    user: req.user._id,
    tool: toolId,
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this tool",
    });
  }

  const review = await Review.create({
    user: req.user._id,
    tool: toolId,
    rating,
    comment,
    status: "pending",
  });

  res.status(201).json({
    success: true,
    data: review,
    message: "Review submitted and pending approval",
  });
});



// 2️⃣ Get Approved Reviews of a Tool (Public)
  const getToolReviews = asyncHandler(async (req, res) => {
  const { toolId } = req.params;

  const reviews = await Review.find({
    tool: toolId,
    status: "approved",
  }).populate("user", "name profilePicture");

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});


/* ======================================================
   ADMIN CONTROLLERS (MODERATION)
====================================================== */

// 3️⃣ Get All Reviews (Admin)
  const getAllReviews = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const reviews = await Review.find(filter)
    .populate("user", "name email")
    .populate("tool", "name")
    .populate("admin", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
})


// 4️⃣ Approve Review (Admin)
  const approveReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (review.status === "approved") {
    return res.status(400).json({
      success: false,
      message: "Review already approved",
    });
  }

  review.status = "approved";
  review.admin = req.user._id;
  await review.save();

  res.status(200).json({
    success: true,
    data: review,
    message: "Review approved successfully",
  });
});

// 5️⃣ Reject Review (Admin)
  const rejectReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  review.status = "rejected";
  review.admin = req.user._id;
  await review.save();

  res.status(200).json({
    success: true,
    data: review,
    message: "Review rejected",
  });
});

// 6️⃣ Delete Review (Admin)
  const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});


// 7️⃣ Get My Review for a Tool (User)
const getMyReviewForTool = asyncHandler(async (req, res) => {
  const { toolId } = req.params;

  const review = await Review.findOne({
    tool: toolId,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: review || null,
  });
});


// 8️⃣ Update Review (User)
const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findOne({
    _id: reviewId,
    user: req.user._id,
  });

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  review.rating = rating;
  review.comment = comment;
  review.status = "pending"; // 🔥 re-approval required
  review.admin = null;

  await review.save();

  res.status(200).json({
    success: true,
    data: review,
    message: "Review updated and pending approval",
  });
});




 

 






export { createReview,
   getToolReviews , getAllReviews , approveReview , rejectReview , deleteReview ,
   getMyReviewForTool, updateReview 




 };

 
 















 

