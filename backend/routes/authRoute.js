import express from 'express'
import { signinController, signupController } from '../controller/authController.js';

const authRoute = express.Router()


authRoute.post('/signup', signupController)
authRoute.post('/signin', signinController)
export default authRoute;