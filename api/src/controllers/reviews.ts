import { Request, Response } from 'express';

export const getReviews = (req: Request, res: Response) => {
    res.send(`getting reviews`)
};


