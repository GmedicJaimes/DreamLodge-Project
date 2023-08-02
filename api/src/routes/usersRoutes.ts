import { Router } from "express";
import { getUsersByID,getUsers } from "../controllers/usersCont";

const userRouter: Router = Router();

userRouter.get("/",getUsers)
userRouter.get("/:id",getUsersByID)

export default userRouter

