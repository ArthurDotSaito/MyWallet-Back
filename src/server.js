import express from 'express';
import cors from 'cors';
import authRouter from './Routes/AuthRoutes.js'
import walletRouter from './Routes/WalletRoutes.js';

// General  ---------------------------------------------------------------------------//

const server = express();
server.use(express.json());
server.use(cors());
const PORT = 5000;

server.use([authRouter, walletRouter]);

// Server Response ------------------------------------------------------------------------//

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
