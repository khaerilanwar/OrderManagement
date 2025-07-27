import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { printLog } from '../src/utils/Helper.js'
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { webhookPayment } from './controllers/PaymentController.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000;
const allowedOrigins = [
    'http://localhost:4200',
    'https://siprodig.vercel.app'
]

app.use(cors({
    origin: function (origin, callback) {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            origin.endsWith('.ngrok-free.app')
        ) {
            callback(null, true);
            // console.log(`CORS request acc from: ${origin}`);
        } else {
            callback(new Error('Not allowed by CORS'));
            // console.log(`CORS request dec from: ${origin}`);
        }
    }, credentials: true
}))
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
// router.post("/webhook/payment", cors(), paymentWebhook)
app.post("/webhook/payment", cors(), webhookPayment)
app.use(router)
app.listen(process.env.PORT, () => {
    printLog(`Server is running on port ${port}`);
})

export default app;