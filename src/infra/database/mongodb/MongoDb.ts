import mongoose from 'mongoose';

export class MongoDb {
  public static uri: string;

  public static async connect(uri?: string): Promise<void> {
    this.uri = uri || process.env.MONGO_URL || 'localhost:27017';
    await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
