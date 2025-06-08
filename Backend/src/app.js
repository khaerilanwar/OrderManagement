import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { printLog } from '../src/utils/Helper.js'
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: 'http://localhost:4200', credentials: true }))
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)
app.listen(process.env.PORT, () => {
    printLog(`Server is running on port ${process.env.PORT}`);
})