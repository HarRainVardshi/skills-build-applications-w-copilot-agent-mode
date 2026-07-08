import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectToDatabase = async () => {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
};

export const closeDatabaseConnection = async () => {
  await mongoose.disconnect();
};

export default mongoose.connection;
