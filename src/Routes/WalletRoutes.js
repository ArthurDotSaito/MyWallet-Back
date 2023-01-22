import express, { Router } from "express";
import { getWallet } from "../controller/GetWallet.js";
import { postWallet } from "../controller/PostWallet.js";

const walletRouter = express.Router();

walletRouter.get("/wallet", getWallet);
walletRouter.post("/wallet", postWallet);

export default walletRouter