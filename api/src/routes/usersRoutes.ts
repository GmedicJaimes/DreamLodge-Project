import { Router } from "express";
import { getUsers } from "../controllers/users";

const userRouter: Router = Router();

userRouter.get("/",getUsers)

export default userRouter

