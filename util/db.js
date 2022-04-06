import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  console.log('DB connection');

  return client;
};
