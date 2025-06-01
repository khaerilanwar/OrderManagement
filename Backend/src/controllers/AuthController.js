import { auth, createNewToken, customerAuth, logout } from "../services/AuthService.js"

export const authenticate = async (req, res) => {
    try {
        const { username, password } = req.body

        const response = await auth(username, password)

        if (!response.success) return res.status(response.statusCode).json(response)

        // Setting cookies client
        res.cookie('refreshToken', response.data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 10 * 60 * 60 * 1000 // 10 jam
        })

        // Menghapus refresh token dari response
        delete response.data.refreshToken

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const signOut = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json({ success: false, statusCode: 401, message: 'Unauthorized!' })
        const response = await logout(refreshToken)
        if (!response.success) return res.status(response.statusCode).json(response)

        res.clearCookie('refreshToken')
        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const newAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json({ success: false, statusCode: 401, message: 'Unauthorized!' })
        const response = await createNewToken(refreshToken)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

// public user
export const customerLogin = async (req, res) => {
    try {
        const { credential } = req.body
        const response = await customerAuth(credential)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}