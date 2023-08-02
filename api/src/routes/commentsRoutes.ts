import { Router } from "express";
import { getComments } from "../controllers/coments";

const commentsRouter: Router = Router();

commentsRouter.get("/",getComments)

export default commentsRouter

