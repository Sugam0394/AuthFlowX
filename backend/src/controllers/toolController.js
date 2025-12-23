import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import {Tool} from '../models/toolmodel.js'
 



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






















// delete Tool
const deleteTool = asyncHandler(async(req , res , next) => {
   try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) throw new Error("Tool not found");

    await tool.remove();
    res.status(200).json({ success: true, message: "Tool deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
})
























 


export  {

 createTool , getTool ,  getToolById , updateTool , deleteTool  

}