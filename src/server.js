import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';

// General Constants ---------------------------------------------------------------------------//

const server = express();
const PORT = 5000;

// Server Configuration ------------------------------------------------------------------------//

server.use(express.json());
server.use(cors());
server.listen(PORT, () => `Server is listening on port ${PORT}`);
dotenv.config();

// Database Configuration -----------------------------------------------------------------------//

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;
try{
    await mongoClient.connect();
    console.log("DB connected");
}catch(error){
    console.log(error);
    console.log("DB error");
}

db = mongoClient.db();
