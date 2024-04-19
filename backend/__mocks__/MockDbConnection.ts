import { MongoMemoryServer } from 'mongodb-memory-server';
import Database from '../src/db/connect';

export default class MockDbConnection {
  private static mongoServer: MongoMemoryServer;

  static async connect() {
    try {
      this.mongoServer = await MongoMemoryServer.create();
      await Database.connect(this.mongoServer.getUri());
    } catch (error) {
      console.log(error);
    }
  }

  static async disconnect() {
    if (!this.mongoServer) return;
    await this.mongoServer.stop();
  }
}
