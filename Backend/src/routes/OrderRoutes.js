import express from 'express';
import { createOrderCustomer, deleteOrder, downloadReport, editDetailOrder, editInvoiceOrder, getListOrderCustomer, getListOrders, getOrderDetail, payConfirmation } from '../controllers/OrderController.js';

const orderRoute = express.Router();

orderRoute.get('/', getListOrders)
orderRoute.get('/:id', getOrderDetail)
orderRoute.put('/detail/:id', editDetailOrder)
orderRoute.put('/invoice/:id', editInvoiceOrder)
orderRoute.delete('/:id', deleteOrder)
orderRoute.get('/report/last30days', downloadReport)

// public customer
orderRoute.get('/customer/:customerId', getListOrderCustomer);
orderRoute.post('/customer', createOrderCustomer)
orderRoute.patch('/customer/:id', payConfirmation)

export default orderRoute;