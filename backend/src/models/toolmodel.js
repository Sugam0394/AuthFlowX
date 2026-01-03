 import mongoose , {Schema} from "mongoose";

 const toolSchema = new mongoose.Schema({
   name : {
    type : String,
    required : [true , 'Tool name is required'],
    trim : true,
   },
   description : {
    type : String,
    trim : true,
   },
   category : {
    type : String,
    trim : true,
    
   },
  url : {
   type : String,
 required : [true , 'Tool url is required'] // making optional for testing
   },
   targetAudience : {
    type : String,
   
    required : true,
   },
   logo: {
    type: String,
   },
   pricing: {
    type: String,
   
   },
    status: {
      type: String,
      enum: ["pending", "approved", "live"],
      default: "pending",
    },

    field: String,

     image: {
   type: String,
    required: true,
    default: "https://yourdomain.com/default-tool.png", 
},


     shortDescription:
      { type: String, 
        trim: true

       },

         // 💎 NEW FIELDS for Home Dashboard
   isPopular:
    { type: Boolean,
       default: false },

   isFeatured: 
   { type: Boolean, 
    default: false },

   featuredUntil:
    { type: Date },


   createdBy : {
     type : mongoose.Schema.Types.ObjectId,
     ref : 'User',
     required : true,  // onlu admin can create
   },
   reviews : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }
]

 }
,
{
    timestamps : true
})

export  const Tool = mongoose.model('Tool' , toolSchema)

export default Tool
 