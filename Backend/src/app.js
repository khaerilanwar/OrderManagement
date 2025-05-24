import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { printLog } from '../src/utils/Helper.js'
import router from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:4200', credentials: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)
app.listen(process.env.PORT, () => {
    printLog(`Server is running on port ${process.env.PORT}`);
})