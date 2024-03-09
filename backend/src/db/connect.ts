import * as mongoose from 'mongoose';

class Database {
  private connection: mongoose.Connection | undefined;

  async connect(uri: string): Promise<void> {
    if (!this.connection) {
      try {
        (this.connection as any) = await mongoose.connect(String(uri));
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
    }
  }

  getConnection(): mongoose.Connection | undefined {
    return this.connection;
  }
}

export default new Database();
