import express from 'express';
import User from '../models/user.model';
import UserController from '../controllers/user.controller'

const app = express();
const userRouter = express.Router();

userRouter.get('', UserController.getAll);
userRouter.get('/:id', UserController.getById)
userRouter.post('/add', UserController.add);
userRouter.post('/login', UserController.login);
userRouter.get('/email/:email', UserController.emailCheck);

export default userRouter;