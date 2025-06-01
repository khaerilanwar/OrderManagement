import express from 'express';
import { createOrderCustomer, deleteOrder, editDetailOrder, editInvoiceOrder, getListOrderCustomer, getListOrders, getOrderDetail, payConfirmation } from '../controllers/OrderController.js';

const orderRoute = express.Router();

orderRoute.get('/', getListOrders)
orderRoute.get('/:id', getOrderDetail)
orderRoute.put('/detail/:id', editDetailOrder)
orderRoute.put('/invoice/:id', editInvoiceOrder)
orderRoute.delete('/:id', deleteOrder)

// public customer
orderRoute.get('/customer/:customerId', getListOrderCustomer);
orderRoute.post('/customer', createOrderCustomer)
orderRoute.patch('/customer/:id', payConfirmation)

export default orderRoute;