import express from 'express';
import { newTestimoniOrder } from '../controllers/TestimoniController.js';

const testimoniRoute = express.Router();

testimoniRoute.post('/customer/:id', newTestimoniOrder)

export default testimoniRoute;