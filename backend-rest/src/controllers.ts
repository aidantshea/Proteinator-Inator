import express, { type Request, type Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as sequences from './models.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/sequences', asyncHandler(async (req: Request, res: Response) => {
    const newSequence = await sequences.createSequence(
        req.body.sequence,
        req.body.encoding,
        req.body.organism
    );
    res.status(201).json(newSequence);
}));

app.listen(PORT, async () => {
    await sequences.connect();
    console.log(`Server listening on PORT ${PORT}...`);
});