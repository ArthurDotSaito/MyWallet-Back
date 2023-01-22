import express, { Router } from "express";
import { getWallet } from "../controller/Wallet.js";

const walletRouter = express.Router();

walletRouter.get("/wallet", getWallet);

export default walletRouter