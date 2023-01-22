import { signUp } from '../controller/AuthSignUp.js';
import { signIn } from '../controller/AuthLogin.js';
import { Router } from 'express';
import { validateSchema } from '../Middleware/schemaMiddleware.js';
import { userRegisterSchema } from '../Schema/UserRegisterSchema.js';
import { userLoginSchema } from '../Schema/UserLoginSchema.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(userRegisterSchema) , signUp);
authRouter.post('/signin', validateSchema(userLoginSchema), signIn);

export default authRouter;

