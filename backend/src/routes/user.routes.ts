import express, { Router } from 'express';
import { verifyToken } from '@/middleware/verify.token.middleware';
import { authLimiter } from "@/middleware/rate.limiting.middleware";
import { validateSchema } from "@/middleware/validate.joi.middleware";
import { createUserSchema, loginSchema, updateProfileSchema, userListSchema } from '@/joi-schema/user.schema';
import { JoiValidateType } from '@/enums';
import userController from '@/controller/user.controller';
import { catchAsync } from '@/utils/catch.async.utils';

const routes: Router = express.Router();

routes.post('/registration', authLimiter, validateSchema(createUserSchema, JoiValidateType.BODY), catchAsync(userController.createUser));
routes.post('/login', authLimiter, validateSchema(loginSchema, JoiValidateType.BODY), catchAsync(userController.loginUser));
routes.post('/logout', verifyToken(), userController.logOut);
routes.get('/userList', validateSchema(userListSchema, JoiValidateType.QUERY), verifyToken(), userController.userList);

export default routes;
