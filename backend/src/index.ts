import { Request, Response } from 'express';
import express from 'express';
const port = 3000;
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
