import { Request, Response } from 'express';
import {reviewsData } from "../../info/resenas/reviews"

export const getReviews = (req: Request, res: Response) => {
    res.json(reviewsData)
};


