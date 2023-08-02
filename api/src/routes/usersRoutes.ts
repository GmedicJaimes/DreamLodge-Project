import { Router } from "express";
import { getUsers } from "../controllers/usersCont";

const userRouter: Router = Router();

userRouter.get("/:id",getUsers)

export default userRouter

