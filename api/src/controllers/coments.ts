import { Request, Response } from 'express';
import {comments} from "../../info/comments/dataComments"

export const getComments = (req: Request, res: Response) => {
    res.json(comments)
};


