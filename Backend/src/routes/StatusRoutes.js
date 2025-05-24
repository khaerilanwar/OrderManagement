import express from 'express';
import { getStatus } from '../controllers/StatusController.js';

const statusRoute = express.Router();

statusRoute.get('/', getStatus)

export default statusRoute;