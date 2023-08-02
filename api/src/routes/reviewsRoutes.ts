import { Router } from "express";
import { getReviews } from "../controllers/reviews";

const reviewsRouter: Router = Router();

reviewsRouter.get("/",getReviews)

export default  reviewsRouter

