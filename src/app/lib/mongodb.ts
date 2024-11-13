import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
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
      cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
      const connection = await cached.promise;
      cached.conn = connection.connection;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  }

  try {
    await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;