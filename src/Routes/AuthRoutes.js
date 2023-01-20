import { signUp } from '../controller/Auth.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', signUp)

export default authRouter;

