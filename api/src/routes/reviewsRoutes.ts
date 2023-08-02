import { Router } from "express";
import { getReviewsFilt,reviewByID  } from "../controllers/reviewsCont";

const reviewsRouter: Router = Router();

reviewsRouter.get("/",getReviewsFilt)
reviewsRouter.get("/:id",reviewByID )

export default  reviewsRouter

