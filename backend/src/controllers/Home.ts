import { Request, Response } from 'express';

export default class Home {
  static async helloWorld(req: Request, res: Response) {
    res.send('Hello world!');
  }
}
