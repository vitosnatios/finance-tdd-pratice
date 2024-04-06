import Database from './db/connect';
import express from 'express';
import Router from './router/routes';
const app = express();
const port = Number(process.env.PORT) || 3000;

(async () => {
  try {
    require('dotenv').config();
    await Database.connect(process.env.MONGODB_URI as string);
    app.use(express.json());
    app.use('/api', Router);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}`)
    );
  } catch (error) {
    console.log('Server error: ', error);
  }
})();

export default app;
