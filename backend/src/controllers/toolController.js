import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import {Tool} from '../models/toolmodel.js'
import Category from "../models/categoryModel.js";
 



// CREATE TOOL
const createTool = asyncHandler(async(req , res) => {

    try {
        const { name , description , category , targetAudience , url , pricing , logo } = req.body;

        // createdBy = admin from req.user
    const tool = await Tool.create({
      name,
      description,
      category,
      targetAudience,
      url,
      pricing,
      logo,
      createdBy: req.user._id, // assuming middleware sets req.user
    });

       res.status(201).json({
      success: true,
      tool,
    });



        }  catch (error) {
        console.error("Error creating tool:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create tool",
            error: error.message
        });
    }






















   
})

//  get all tools (Public)
const getTool = asyncHandler(async(req , res ) => {
  try {
    const query = { status: "live" }; // only live tools



    // optional filters
    if (req.query.category) query.category = req.query.category;
    if (req.query.targetAudience) query.targetAudience = req.query.targetAudience;
    if (req.query.pricing) query.pricing = req.query.pricing;




    const tools = await Tool.find(query).populate("reviews");

    res.status(200).json({ success: true, tools });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
})



// get single tool by id
const getToolById = asyncHandler(async(req , res) => {
    
     try {
    const tool = await Tool.findById(req.params.id).populate("reviews");
    if (!tool) throw new Error("Tool not found");
    res.status(200).json({ success: true, tool });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }


    })
    

// update tool by ID
const updateTool = asyncHandler(async(req , res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) throw new Error("Tool not found");

    // update allowed fields
    const fields = ["name", "description", "category", "targetAudience", "url", "pricing", "logo", "status"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) tool[field] = req.body[field];
    });

    await tool.save();
    res.status(200).json({ success: true, tool });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
})


 const deleteTool = asyncHandler(async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: "Tool not found",
      });
    }

    await Tool.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tool deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});





 const getAllToolsAdmin = asyncHandler(async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const totalTools = await Tool.countDocuments();
    const tools = await Tool.find()
      .skip(skip)
      .limit(limit)
      .populate("reviews");

      console.log("ADMIN TOOLS COUNT:", tools.length);


    res.status(200).json({
      tools,
      page,
      totalPages: Math.ceil(totalTools / limit),
      totalTools,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


const approveTool = asyncHandler(async (req, res) => {
 
  try {
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { status: "live" },
      { new: true }
    );
    res.json({ success: true, tool });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const rejectTool = asyncHandler(async (req, res) => {

  try {
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json({ success: true, tool });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});



// Get popular tools

 export const getPopularTools = async (req, res) => {
  try {
    const tools = await Tool.find({
      isPopular: true,
      
    })
      .select("name image url")
      .limit(6)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load popular tools",
    });
  }
};


// GET featured tools
 export const getFeaturedTools = async (req, res) => {
  try {
    const today = new Date();

    const tools = await Tool.find({
      isFeatured: true,
      $or: [
        { featuredUntil: { $gte: today } },
        { featuredUntil: { $exists: false } },
      ],
    })
      .select("name image url")
      .limit(5)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load featured tools",
    });
  }
};


// GET categories
 export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getHomeTools = async (req, res) => {
  try {
    const tools = await Tool.find({ status: "live" })
      .select("name image url")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load home tools",
    });
  }
};



 const getRecommendedTools = async (req, res) => {
  try {
    const field = req.query.field?.toLowerCase();

    if (!field) {
      return res.status(400).json({ message: "Field is required" });
    }

    const tools = await Tool.find({
      category: new RegExp(field, "i"),
      status: "pending", // later change to approved
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};





























export  {

 createTool , getTool ,  getToolById , updateTool , deleteTool  , getAllToolsAdmin ,
 approveTool,
 rejectTool,
 getRecommendedTools
 
 

}