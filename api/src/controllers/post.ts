import { Request, Response } from 'express';

export const getPosts = (req: Request, res: Response) => {
    res.send(`getting posts`)
};


