import express from 'express';
import { login } from '../controllers/usersCred.js';
const userCredsRoutes = express.Router();

userCredsRoutes.post('/userlogin',login );

export default userCredsRoutes;
