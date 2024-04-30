const cors = require('cors');
require('dotenv').config();
import Database from './db/connect';
import express from 'express';
import Router from './router/routes';
const app = express();

(async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    const corsOptions = {
      origin: String(process.env.CLIENT_URL),
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded());
    await Database.connect(String(process.env.MONGODB_URI));
    app.use('/api', Router);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}`)
    );
  } catch (error) {
    console.log('Server error: ', error);
  }
})();

export default app;
