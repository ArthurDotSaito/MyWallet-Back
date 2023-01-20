import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Database Configuration -----------------------------------------------------------------------//
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db;

try {
  await mongoClient.connect()
  db = mongoClient.db()
} catch (error) {
  console.log('Deu errro no server')
}

export default db