import jwt, { JwtPayload } from "jsonwebtoken"

export const generateAccessToken = (email: string) => {
    const secret = process.env.TOKEN_SECRET

    if (secret) {
        try {
            return jwt.sign({ email }, secret, { expiresIn: '3h' });
        } catch (error) {
            console.log(error)
        }
    }
}

export const generateRefreshToken = (email: string) => {
    const secret = process.env.TOKEN_SECRET

    if (secret) {
        try {
            return jwt.sign({ email }, secret, { expiresIn: '24h' });
        } catch (error) {
            console.log(error)
        }
    }
}

export const verifyToken = (token: string): string | undefined => {
    try {
        const secret = process.env.TOKEN_SECRET
        if (secret) {
            const decodeResult = jwt.verify(token, secret) as JwtPayload
            return decodeResult.email
        }
    } catch (error) {
        console.log(error)
    }
}