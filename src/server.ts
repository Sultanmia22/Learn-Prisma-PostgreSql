import express, { type Express, type Request, type Response } from 'express';
import { prisma } from './db.ts';
import cors from 'cors';
import router from './routes/index.ts';
const app: Express = express();
const port = 3000;

app.use(cors())
app.use(express.json());

// Product Create Endpoint 
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});