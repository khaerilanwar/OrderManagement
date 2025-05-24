import express from 'express';
import { editDetailOrder, editInvoiceOrder, getListOrders, getOrderDetail } from '../controllers/OrderController.js';

const orderRoute = express.Router();

orderRoute.get('/', getListOrders)
orderRoute.get('/:id', getOrderDetail)
orderRoute.put('/detail/:id', editDetailOrder)
orderRoute.put('/invoice/:id', editInvoiceOrder)

export default orderRoute;