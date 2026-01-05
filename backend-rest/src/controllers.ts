import { Router, type Request, type Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as sequences from './models.js';

const router = Router();

router.post('/sequences', asyncHandler(async (req: Request, res: Response) => {
    const newSequence = await sequences.createSequence(
        req.body.sequence,
        req.body.encoding,
        req.body.organism
    );
    res.status(201).json(newSequence);
}));

export default router;