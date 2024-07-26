import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoute from './routes/authRoute.js';
import employeeRouter from './routes/emplyeeRoute.js';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config(); 
const app =express()
const port = 4000

app.use(express.json())
// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:5173",
    "http://localhost:5174",
    undefined,
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS from origin : ${origin}`));
      }
    },
    credentials: true,
  };
app.use(cors(corsOptions))
// db connection
connectDB()



//apis
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.use('/api/auth', authRoute)
app.use('/api/employee', employeeRouter)

//default route
app.get('/', (req,res)=>{
 res.send('Welcome to DealsDray Backend!!')
})

app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})

