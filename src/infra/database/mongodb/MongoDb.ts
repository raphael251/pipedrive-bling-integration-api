import mongoose, { Document } from 'mongoose';

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

  public static map(data: Document): any {
    const { _id, ...document } = data.toObject();
    return { id: _id, ...document };
  }
}
