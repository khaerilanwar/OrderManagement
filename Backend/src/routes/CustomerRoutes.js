import express from 'express';
import { getCustomers } from '../controllers/CustomerController.js';

const customerRoute = express.Router();

customerRoute.get('/', getCustomers);

export default customerRoute;