import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/Database.js'

// Autentikasi user
export const auth = async (username, password) => {
    try {
        // Cek nilai username dan password
        if (!username || !password) return { success: false, statusCode: 400, message: 'Username and password are required!' }

        // Cek user di database
        const user = await prisma.user.findFirst({
            where: { username }
        })

        // Jika user tidak ditemukan kasih error
        if (!user) return { success: false, statusCode: 404, message: 'User not found!' }

        // Jika user ditemukan, cek password
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) return { success: false, statusCode: 400, message: 'Invalid password!' }

        // Buat refresh token
        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.REFRESH_KEY,
            {
                expiresIn: '10h',
                subject: user.username,
                audience: 'orderfe',
                issuer: 'orderbe'
            },
        )

        // Buat access token
        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_KEY,
            {
                expiresIn: '5h',
                subject: user.username,
                audience: 'orderfe',
                issuer: 'orderbe'
            },
        )

        // Simpan refresh token ke database
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        })

        return { success: true, statusCode: 200, message: 'Login success!', data: { accessToken, refreshToken } }

    } catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}

export const createNewToken = async (refreshToken) => {
    try {
        const user = await prisma.user.findFirst({
            where: { refreshToken }
        })
        if (!user) return { success: false, statusCode: 401, message: 'Unauthorized!' }

        return new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken, process.env.REFRESH_KEY,
                { issuer: 'orderbe', audience: 'orderfe' },
                (err, decoded) => {
                    if (err) {
                        resolve({ success: false, statusCode: 401, message: 'Unauthorized!' })
                    } else {
                        const accessToken = jwt.sign(
                            { userId: user.id },
                            process.env.ACCESS_KEY,
                            {
                                expiresIn: '30s',
                                subject: user.username,
                                audience: 'orderfe',
                                issuer: 'orderbe'
                            }
                        )

                        resolve({ success: true, statusCode: 200, message: 'Successfully get new token!', data: { accessToken } })
                    }
                }
            )
        })
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}

export const logout = async (refreshToken) => {
    try {
        const user = await prisma.user.findFirst({
            where: { refreshToken }
        })
        if (!user) return { success: false, statusCode: 404, message: 'Invalid refresh token!' }
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: null }
        })

        return { success: true, statusCode: 200, message: 'Logout success!' }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}