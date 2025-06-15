import { v4 as uuidv4 } from 'uuid';
import { prisma } from "../config/Database.js"
import moment from 'moment';
import crypto from 'crypto';
import Midtrans from 'midtrans-client';

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
})

let authRequestMidtrans = 'Basic ' + Buffer.from(
    `${process.env.MIDTRANS_SERVER_KEY}:`,
    'utf-8'
).toString('base64')

const midtransApi = process.env.MIDTRANS_API

function splitFullName(fullName) {
    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 1) {
        return {
            firstName: parts[0],
            lastName: ''
        };
    }

    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(' ')
    };
}

export const cancelPayment = async (req, res) => {
    try {
        const { orderId } = req.body

        const response = await fetch(
            `${midtransApi}/${orderId}/cancel`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/json'
                }
            }
        )

        const responseData = await response.json()

        await prisma.order.update({
            where: { id: orderId },
            data: {
                status_id: 6,
                adjusted: true
            }
        })

        const maxTimeline = await prisma.timelineStatus.aggregate({ _max: { sequence: true }, where: { order_id: orderId } })
        const cancelStatus = await prisma.status.findUnique({ where: { id: 6 } })
        await prisma.timelineStatus.create({
            data: {
                sequence: maxTimeline._max.sequence ? maxTimeline._max.sequence + 1 : 1,
                status_id: cancelStatus.id,
                description: cancelStatus.description,
                order_id: orderId
            }
        })

        console.log(responseData)

        return res.status(200).json({ ok: 'ok' })
    }
    catch (err) {
        return res.status(500).json({ error: err.message || 'An error occurred while processing the payment.' })
    }
}

export const pendingPayment = async (req, res) => {
    try {
        const { order_id, gross_amount, productId, customerId } = req.body;

        const pendingStatus = await prisma.status.findUnique({ where: { id: 2 } })
        const productSelected = await prisma.product.findUnique({ where: { id: productId } })

        await prisma.order.create({
            data: {
                id: order_id,
                title: productSelected.name,
                description: productSelected.description,
                down_payment: 0,
                invoice: Number(gross_amount),
                customer_id: customerId,
                status_id: pendingStatus.id,
                category_id: '1',
                product_id: productSelected.id,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        const timelineData = [1, 2]
        timelineData.forEach(async (item, idx) => {
            let status = await prisma.status.findUnique({ where: { id: item } })
            await prisma.timelineStatus.create({
                data: {
                    sequence: idx + 1,
                    description: status.description,
                    status_id: status.id,
                    order_id: order_id,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })
        })

        return res.status(200).json({ success: true, statusCode: 200, message: 'Success' })
    }
    catch (err) {
        return res.status(500).json({ error: err.message || 'An error occurred while processing the payment.' });
    }
}

export const successPayment = async (req, res) => {
    try {
        const { order_id, gross_amount, transaction_time, productId, customerId, productCategory, licenseId } = req.body;

        const statusOrder = [2, 4].includes(Number(productCategory)) ? 5 : 4;
        const finishedStatus = await prisma.status.findUnique({ where: { id: statusOrder } })
        const productSelected = await prisma.product.findUnique({ where: { id: productId } })

        await prisma.order.create({
            data: {
                id: order_id,
                title: productSelected.name,
                description: productSelected.description,
                down_payment: Number(gross_amount),
                invoice: Number(gross_amount),
                completed_at: transaction_time ? new Date(transaction_time) : new Date(),
                customer_id: customerId,
                adjusted: true,
                status_id: finishedStatus.id,
                category_id: '1',
                product_id: productSelected.id,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        // langsung selesai
        if ((productCategory == 4 && licenseId) || productCategory == 2) {
            const timelineData = [1, 2, 4, 5]
            timelineData.forEach(async (item, idx) => {
                let status = await prisma.status.findUnique({ where: { id: item } })
                await prisma.timelineStatus.create({
                    data: {
                        sequence: idx + 1,
                        description: status.description,
                        status_id: status.id,
                        order_id: order_id,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                })
            })

            // license
            if (productCategory == 4) {
                const quantity = Number(gross_amount) / productSelected.price
                const addDays = quantity * 7
                const licenseSelected = await prisma.license.findUnique({ where: { id: licenseId } })
                const curDate = new Date(licenseSelected.expire_date)
                const newExpireDate = curDate > new Date() ? curDate : new Date()
                newExpireDate.setDate(newExpireDate.getDate() + addDays)

                await prisma.license.update({
                    where: {
                        id: licenseId
                    },
                    data: {
                        expire_date: newExpireDate
                    }
                })
            }
        }
        // diproses admin
        else {
            const timelineData = [1, 2, 4]
            timelineData.forEach(async (item, idx) => {
                let status = await prisma.status.findUnique({ where: { id: item } })
                await prisma.timelineStatus.create({
                    data: {
                        sequence: idx + 1,
                        description: status.description,
                        status_id: status.id,
                        order_id: order_id,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                })
            })
        }

        return res.status(200).json({ success: true, statusCode: 200, message: "Payment order success" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message || 'An error occurred while processing the payment.' });
    }
}

export const webhookPayment = async (req, res) => {
    try {
        // console.log(snap.transaction)
        console.log(req.body);
        return res.status(200).send("OK")
        const { order_id, transaction_status, gross_amount, settlement_time } = req.body;
        const maxTimeline = await prisma.timelineStatus.aggregate({ _max: { sequence: true }, where: { order_id: order_id } })

        if (transaction_status === 'settlement') {
            await prisma.order.update({
                where: { id: order_id },
                data: {
                    down_payment: gross_amount,
                    status_id: 5,
                    completed_at: settlement_time ? new Date(settlement_time) : new Date()
                }
            })

            const finishedStatus = await prisma.status.findUnique({ where: { id: 5 } })
            await prisma.timelineStatus.create({
                data: {
                    sequence: maxTimeline._max.sequence ? maxTimeline._max.sequence + 1 : 1,
                    description: finishedStatus.description,
                    status_id: finishedStatus.id,
                    order_id: order_id
                }
            })
        }
        else if (transaction_status === 'expire' || transaction_status === 'cancel') {
            await prisma.order.update({
                where: { id: order_id },
                data: {
                    status_id: 6
                }
            })

            const finishedStatus = await prisma.status.findUnique({ where: { id: 6 } })
            await prisma.timelineStatus.create({
                data: {
                    sequence: maxTimeline._max.sequence ? maxTimeline._max.sequence + 1 : 1,
                    description: finishedStatus.description,
                    status_id: finishedStatus.id,
                    order_id: order_id
                }
            })
        }
        else if (transaction_status === 'pending') {
            await prisma.order.create({
                data: {

                }
            })
        }

        return res.status(200).json({ success: true, message: 'Webhook received successfully.' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message || 'An error occurred while processing the webhook.' });
    }
}

export const tokenPayment = async (req, res) => {
    try {
        const { productId, quantity, customerId } = req.body;

        const productSelected = await prisma.product.findUnique({ where: { id: productId }, include: { category: true } })
        const customer = await prisma.customer.findUnique({ where: { id: customerId } })
        if (!productSelected)
            return res.status(404).json({ success: false, statusCode: 404, message: "Product selected not found!" })
        if (!customer)
            return res.status(404).json({ success: false, statusCode: 404, message: "Customer not found!" })

        const customerSplitName = splitFullName(customer.name)
        const { _max } = await prisma.order.aggregate({ _max: { id: true } })
        const lastOrderNumber = Number((_max.id ?? '').slice(-4)) || 0;
        // const newOrderId = moment().format("YYYYMM") + (lastOrderNumber + 1).toString().padStart(4, '0');
        const newOrderId = `${moment().format("YYYYMM")}${Math.floor(Math.random() * 9000) + 1000}`;
        // const newOrderId = '2025060040'
        // const newOrder = await prisma.order.create({
        //     data: {
        //         id: newOrderId,
        //         title: productSelected.name,
        //         description: productSelected.description,
        //         down_payment: 0,
        //         invoice: productSelected.price * Number(quantity),
        //         customer_id: customerId,
        //         status_id: 2,
        //         category_id: categories_id[Math.floor(Math.random() * categories_id.length)].id,
        //         product_id: productSelected.id,
        //         created_at: new Date(),
        //         updated_at: new Date()
        //     }
        // })

        const parameter = {
            item_details: {
                name: productSelected.name,
                price: productSelected.price,
                quantity: quantity,
                category: productSelected.category.name,
                merchant_name: 'SIPRODIG'
            },
            transaction_details: {
                order_id: newOrderId,
                gross_amount: productSelected.price * Number(quantity)
            },
            expiry: {
                start_time: moment().format("YYYY-MM-DD HH:mm:ss Z"),
                unit: 'minute',
                duration: 10
            },
            customer_details: {
                first_name: customerSplitName.firstName,
                last_name: customerSplitName.lastName,
                email: customer.email,
                phone: customer.phone
            }
        }

        const token = await snap.createTransactionToken(parameter);

        return res.status(200).json({ token })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const testDokuSandbox = async (req, res) => {
    try {
        const dokuEndpoint = process.env.DOKU_API;
        const dokuAPIKey = process.env.DOKU_API_KEY;
        const dokuClientId = process.env.DOKU_CLIENT_ID;
        const targetPath = "/authorization/v1/access-token/b2b"
        const uuid = uuidv4();
        const timestamp = new Date().toISOString();
        const randomInt = Math.floor(Math.random() * 9000) + 1000;

        const body = {
            order: {
                invoice_number: 'INV-' + moment().format('YYYYMMDD') + '-' + randomInt,
                amount: 10000
            },
            payment: {
                payment_due_date: 60
            },
            virtual_account_info: {
                expired_time: 60,
                reusable_status: false
            },
            customer: {
                name: 'Khaeril Anwar',
                email: 'anwar@gmail.com'
            }
        };

        const jsonBody = JSON.stringify(body);

        // buat signature
        const digest = crypto
            .createHash('sha256')
            .update(jsonBody)
            .digest('hex');
        const signaturComponent =
            `Client-Id:${dokuClientId}\nRequest-Id:${uuid}\nRequest-Timestamp:${timestamp}\nRequest-Target:${targetPath}\nDigest:${digest}`
        const signature = crypto
            .createHmac('sha256', dokuAPIKey)
            .update(signaturComponent)
            .digest('base64')

        const respose = await fetch(
            dokuEndpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Client-Id': dokuClientId,
                    'Request-Id': uuid,
                    'Request-Timestamp': timestamp,
                    'Signature': `HMACSHA256=${signature}`
                },
                body: jsonBody
            }
        )

        const dataResponse = await respose.json();

        res.status(200).json(dataResponse)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}