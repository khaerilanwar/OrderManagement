import express from 'express';
import { getCustomer, getCustomers } from '../controllers/CustomerController.js';

const customerRoute = express.Router();

customerRoute.get('/', getCustomers);
customerRoute.get('/:id', getCustomer);

export default customerRoute;