import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, 
    required: true,
     unique: true },
     slug: { type: String,  } // for URL
});

 export  const Category =  mongoose.model("Category", categorySchema);

 export default Category
 

