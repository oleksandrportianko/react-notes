import jwt from "jsonwebtoken"

export const generateAccessToken = (email: string) => {
    const secret =  process.env.TOKEN_SECRET

    if (secret) {
        try {
            return jwt.sign({ email }, secret, { expiresIn: '3h' });
        } catch (error) {
            console.log('error while generate access token', error)
        }
    }
}

export const generateRefreshToken = (email: string) => {
    const secret =  process.env.TOKEN_SECRET

    if (secret) {
        try {
            return jwt.sign({ email }, secret, { expiresIn: '24h' });
        } catch (error) {
            console.log('error while generate refresh token', error)
        }
    }
}