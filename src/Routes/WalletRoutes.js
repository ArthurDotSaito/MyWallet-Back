import express, { Router } from "express";
import { getWallet, postWallet } from "../controller/Wallet.js";

const walletRouter = express.Router();

walletRouter.get("/wallet", getWallet);
walletRouter.post("/wallet", postWallet);

export default walletRouter