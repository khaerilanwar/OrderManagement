import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ success: false, statusCode: 401, message: 'Unauthorized!' })

    jwt.verify(
        token, process.env.ACCESS_KEY,
        { issuer: 'orderbe', audience: 'orderfe' },
        (err, decoded) => {
            if (err) return err.name === 'TokenExpiredError' ?
                res.status(401).json({ success: false, statusCode: 401, message: 'Token expired!' }) :
                res.status(401).json({ success: false, statusCode: 401, message: 'Invalid token!' })

            req.username = decoded.username
            next()
        }
    )
}

export default verifyToken