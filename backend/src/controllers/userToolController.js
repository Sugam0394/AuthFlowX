import Tool from "../models/toolmodel.js";
import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";


 // userToolsController.js

export const getLiveToolsByUser = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const { search, category } = req.query;

  const filter = { status: "live" };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  const totalTools = await Tool.countDocuments(filter);

  const tools = await Tool.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    tools,
    page,
    totalPages: Math.ceil(totalTools / limit),
  });
});



