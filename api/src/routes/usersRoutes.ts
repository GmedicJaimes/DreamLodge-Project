import { Router } from "express";
import { getUsers } from "../controllers/usersCont";

const userRouter: Router = Router();

userRouter.get("/",getUsers)

export default userRouter

