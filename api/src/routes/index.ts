import { Router } from "express";
import { getUsers } from "../controllers/users";

const mainRouter: Router = Router();

mainRouter.get('/users', getUsers )

export default mainRouter

