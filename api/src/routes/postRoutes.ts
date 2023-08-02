import { Router } from "express";
import { getPosts } from "../controllers/post";

const PostsRouter: Router = Router();

PostsRouter.get("/",getPosts)

export default  PostsRouter

