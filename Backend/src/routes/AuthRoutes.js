import express from 'express';
import { authenticate, customerLogin, newAccessToken, signOut } from '../controllers/AuthController.js';
import { customerRegister } from '../controllers/CustomerController.js';

const authRoute = express.Router();

// admin
authRoute.get('/token', newAccessToken)
authRoute.post('/login', authenticate)
authRoute.delete('/logout', signOut)

// user public
authRoute.post('/customer-login', customerLogin)
authRoute.post('/customer-register', customerRegister) // Assuming this is for customer registration

export default authRoute;