import express from 'express';
import cors from 'cors'


const app = express()
const PORT = 3000
import dbconnect from "./config/mongodb.js"
import userRoute from './routes/userRoute.js';
dbconnect()
app.use(cors({
  // origin:"http://localhost:5173",   
  origin:"https://student-list-client-sgnn.vercel.app",
  methods:['GET','POST','PUT','PATCH'],
  credentials:true
}))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:'50mb',extended:true}))


app.use('/',userRoute)


app.listen(PORT,()=>{
  console.log(`server running on port http://localhost:${PORT}`);
})
