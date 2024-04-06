import * as mongoose from 'mongoose';

class Database {
  private static connection: mongoose.Connection | undefined;

  static async connect(
    uri: string,
    options?: mongoose.ConnectOptions,
    mongoClient = mongoose
  ): Promise<void> {
    if (!this.connection) {
      try {
        (this.connection as any) = await mongoClient.connect(
          String(uri),
          options
        );
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
    }
  }

  static getConnection(): mongoose.Connection | undefined {
    return this.connection;
  }
}

export default Database;
