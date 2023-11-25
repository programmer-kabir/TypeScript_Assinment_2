import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// Application Router
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('server running!');
});

export default app;
