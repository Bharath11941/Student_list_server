import express from "express";
import { deleteStudent, editStudent, getStudents, userRegister } from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateBody.js";

const userRoute = express()


userRoute.post("/",validateUser,userRegister)
userRoute.get('/students',getStudents)
userRoute.get('/delete',deleteStudent)
userRoute.post("/editStudent",validateUser,editStudent)


export default userRoute
