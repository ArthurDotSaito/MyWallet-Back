import express from 'express';
import cors from 'cors';
import authRouter from './Routes/AuthRoutes.js'

// General  ---------------------------------------------------------------------------//

const server = express();
server.use(express.json());
server.use(cors());
const PORT = 5000;

// Server Response ------------------------------------------------------------------------//

server.listen(PORT, () => `Server is listening on port ${PORT}`);






