import { Router } from "express";
import { getReviews } from "../controllers/reviewsCont";

const reviewsRouter: Router = Router();

reviewsRouter.get("/",getReviews)

export default  reviewsRouter

