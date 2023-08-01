import { Request, Response } from 'express';

export const getComments = (req: Request, res: Response) => {
    res.send(`getting comments`)
};


