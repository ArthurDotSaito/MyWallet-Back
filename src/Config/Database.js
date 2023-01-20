import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Database Configuration -----------------------------------------------------------------------//
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
} catch (error) {
  console.log("Erro no servidor");
  console.log(error)
}

export default db;