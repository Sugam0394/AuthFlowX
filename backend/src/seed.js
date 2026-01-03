 import mongoose from "mongoose";
import dotenv from "dotenv";


import {Tool} from './models/toolmodel.js'
import { Category } from "./models/categoryModel.js";


 
 
 

dotenv.config();

// 🔹 DB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected for seeding..."))
.catch((err) => console.error("DB connection error:", err));

// 🔹 Admin user placeholder
const ADMIN_ID = "694a8e4b84fb0127c1e0f07d"; // Replace with real admin _id if available

// 🔹 Sample Popular + Featured tools
 const tools = [
  {
    name: "ChatGPT",
    slug: "chatgpt",
    description: "AI assistant for writing, coding, and ideas.",
    category: "Productivity",
    url: "https://chat.openai.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    targetAudience: "Everyone",
    isPopular: true,
    isFeatured: true,
    featuredUntil: new Date(Date.now() + 7*24*60*60*1000),
    createdBy: ADMIN_ID,
  },
  {
    name: "Midjourney",
    slug: "midjourney",
    description: "AI image generation tool.",
    category: "Design",
    url: "https://www.midjourney.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Midjourney_Logo.png",
    targetAudience: "Designers",
    isPopular: true,
    isFeatured: false,
    createdBy: ADMIN_ID,
  },
  {
    name: "Notion AI",
    slug: "notion-ai",
    description: "Smart productivity assistant in Notion.",
    category: "Productivity",
    url: "https://www.notion.so",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Notion-logo.svg",
    targetAudience: "Everyone",
    isPopular: true,
    isFeatured: true,
    featuredUntil: new Date(Date.now() + 5*24*60*60*1000),
    createdBy: ADMIN_ID,
  },
  {
    name: "Grammarly",
    slug: "grammarly",
    description: "AI-powered writing improvement tool.",
    category: "Writing",
    url: "https://www.grammarly.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Grammarly_logo.svg",
    targetAudience: "Writers",
    isPopular: true,
    isFeatured: false,
    createdBy: ADMIN_ID,
  },
  {
    name: "Jasper AI",
    slug: "jasper-ai",
    description: "Content generation AI for marketers.",
    category: "Marketing",
    url: "https://www.jasper.ai",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Jasper_Logo.png",
    targetAudience: "Marketers",
    isPopular: true,
    isFeatured: true,
    featuredUntil: new Date(Date.now() + 10*24*60*60*1000),
    createdBy: ADMIN_ID,
  },
  {
    name: "Claude AI",
    slug: "claude-ai",
    description: "Advanced AI assistant for deep reasoning.",
    category: "Productivity",
    url: "https://www.anthropic.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Anthropic_logo.svg",
    targetAudience: "Professionals",
    isPopular: false,
    isFeatured: true,
    featuredUntil: new Date(Date.now() + 7*24*60*60*1000),
    createdBy: ADMIN_ID,
  },
  {
    name: "Perplexity AI",
    slug: "perplexity-ai",
    description: "AI-powered search and research engine.",
    category: "Research",
    url: "https://www.perplexity.ai",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Perplexity_AI_logo.png",
    targetAudience: "Students",
    isPopular: false,
    isFeatured: true,
    featuredUntil: new Date(Date.now() + 7*24*60*60*1000),
    createdBy: ADMIN_ID,
  },
  {
    name: "Runway",
    slug: "runway",
    description: "AI video generation and editing platform.",
    category: "Video",
    url: "https://www.runwayml.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/69/RunwayML_logo.png",
    targetAudience: "Video Creators",
    isPopular: false,
    isFeatured: true,
    featuredUntil: new Date(Date.now() + 7*24*60*60*1000),
    createdBy: ADMIN_ID,
  },
];


// 🔹 Sample Categories
const categoriesRaw = ["Productivity","Design","Writing","Marketing","Video","Research"];
const categories = categoriesRaw.map(name => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-")
}));

// 🔹 Seed function
const seedDB = async () => {
  try {
    await Tool.insertMany(tools);
    await Category.insertMany(categories);

    console.log("✅ Sample tools & categories seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  }
};

seedDB();

