import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    try {
      console.log('Connecting to MongoDB...');
      cached.promise = mongoose.connect(process.env.MONGODB_URI!, {
        ...opts,
        dbName: process.env.MONGODB_DB || 'notary_calculator',
        maxPoolSize: 10
      }).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      });
    } catch (error) {
      cached.promise = null;
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('Error awaiting MongoDB connection:', error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect; 