import { Router } from "express";
import { getPosts } from "../controllers/postCont";

const PostsRouter: Router = Router();

PostsRouter.get("/",getPosts)

export default  PostsRouter
