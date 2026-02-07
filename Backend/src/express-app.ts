import express, { Request, Response } from 'express';
import imageUploadRouter from './routes/image.router';
import postRouter from './routes/post.router';
import authRouter from './routes/auth.router';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API');
});

app.use('/api', imageUploadRouter);
app.use('/api', postRouter);
app.use('/api', authRouter);

export default app;