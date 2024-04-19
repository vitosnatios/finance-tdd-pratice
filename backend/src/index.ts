import Database from './db/connect';
import express from 'express';
import Router from './router/routes';
const app = express();
const cors = require('cors');
const port = Number(process.env.PORT) || 3000;

(async () => {
  try {
    require('dotenv').config();
    const whitelist = [process.env.CLIENT_URL];
    const corsOptions = {
      origin: function (
        origin: string,
        callback: (err: Error | null, allow?: boolean) => void
      ) {
        if (whitelist.includes(origin)) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
      },
    };
    await Database.connect(process.env.MONGODB_URI as string);
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use('/api', Router);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}`)
    );
  } catch (error) {
    console.log('Server error: ', error);
  }
})();
