import { Router } from "express";
import { getComments } from "../controllers/commentsCont";

const commentsRouter: Router = Router();

commentsRouter.get("/",getComments)

export default commentsRouter

