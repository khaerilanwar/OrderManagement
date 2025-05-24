import express from 'express';
import { authenticate, newAccessToken, signOut } from '../controllers/AuthController.js';

const authRoute = express.Router();

authRoute.get('/token', newAccessToken)
authRoute.post('/login', authenticate)
authRoute.delete('/logout', signOut)

export default authRoute;