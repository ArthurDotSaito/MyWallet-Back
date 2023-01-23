import express, { Router } from "express";
import { getWallet } from "../controller/GetWallet.js";
import { postWallet } from "../controller/PostWallet.js";
import { validateSchema } from "../Middleware/schemaMiddleware.js";
import { walletRegisterSchema}  from '../Schema/walletRegisterSchema.js'
import {tokenValidation} from '../Middleware/tokenValidation.js'

const walletRouter = express.Router();

walletRouter.get("/wallet" , tokenValidation(), getWallet);
walletRouter.post("/wallet", tokenValidation(), postWallet);

export default walletRouter