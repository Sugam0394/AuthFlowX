import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({extended : true , limit:"20kb"}))
app.use(express.static('public'))
app.use(cookieParser());

  
import userRouter from './routes/userroutes.js';
app.use('/api/auth', userRouter)


// admin routes declaration
 import adminRouter from './routes/adminroutes.js';
app.use('/api/admin' , adminRouter) 

// CRUD TOOLS
import toolRouter from './routes/toolRoutes.js';
app.use('/api' , toolRouter )

// review routes 
import reviewRouter from './routes/reviewroutes.js';
app.use('/api' , reviewRouter)



// category 
import categoryRoutes from './routes/categoryRoutes.js'

 

app.use("/api/category", categoryRoutes);


// Chat router
import chaiRouter from './routes/chatRoutes.js';

app.use("/api" , chaiRouter)


 


export default app