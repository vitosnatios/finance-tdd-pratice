import express from 'express';
import Router from './router/routes';
require('dotenv').config();
import Database from './db/connect';
const app = express();
const port = Number(process.env.PORT) || 3000;

(async () => {
  await Database.connect(process.env.MONGODB_URI as string);
})();

app.use(express.json());
app.use('/api', Router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
