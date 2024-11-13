import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
}

let cached = (global as any).mongoose as MongooseCache;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null
  };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB || 'notary_calculator',
      maxPoolSize: 10,
    };

    try {
      const mongooseInstance = await mongoose.connect(process.env.MONGODB_URI!, opts);
      cached.conn = mongooseInstance.connection;
      cached.promise = Promise.resolve(mongooseInstance);
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  }

  try {
    const mongooseInstance = await cached.promise;
    return mongooseInstance.connection;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default dbConnect;