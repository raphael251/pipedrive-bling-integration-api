import mongoose from 'mongoose';
import { MongoDb } from './MongoDb';

describe('Test MongoDb', () => {
  it('Should connect to and disconnect from database', async () => {
    await MongoDb.connect();
    expect(await mongoose.connection.readyState).toBe(1);
    await MongoDb.disconnect();
    expect(await mongoose.connection.readyState).toBe(0);
  });
});
