import express from 'express';
import { createOrderCustomer, deleteOrder, downloadReport, editDetailOrder, editInvoiceOrder, getListOrderCustomer, getListOrders, getOrderDetail, payConfirmation } from '../controllers/OrderController.js';
import { cancelPayment, pendingPayment, successPayment, tokenPayment } from '../controllers/PaymentController.js';

const orderRoute = express.Router();

orderRoute.get('/', getListOrders)
orderRoute.get('/:id', getOrderDetail)
orderRoute.put('/detail/:id', editDetailOrder)
orderRoute.put('/invoice/:id', editInvoiceOrder)
orderRoute.delete('/:id', deleteOrder)
orderRoute.get('/report/last30days', downloadReport)

// test payment gateway midtrans
orderRoute.post('/payment-tokenizer', tokenPayment)
orderRoute.post('/payment-cancel', cancelPayment)
orderRoute.post('/payment-pending', pendingPayment)
orderRoute.post('/payment-success', successPayment)

// public customer
orderRoute.get('/customer/:customerId', getListOrderCustomer);
orderRoute.post('/customer', createOrderCustomer)
orderRoute.patch('/customer/:id', payConfirmation)

export default orderRoute;