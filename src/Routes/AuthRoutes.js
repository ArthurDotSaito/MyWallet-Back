import { signUp } from '../controller/Auth';
import {Router} from 'express';

const authRouter = Router();

authRouter.post('/signup', signUp)

export default authRouter;

