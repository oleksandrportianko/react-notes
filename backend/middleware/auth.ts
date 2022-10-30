import jwt from "jsonwebtoken"

export function generateAccessToken(email: string) {
    const secret =  process.env.TOKEN_SECRET
    if (secret) {
        return jwt.sign(email, secret, { expiresIn: '180m' });
    } else {
        return Error('don`t have secret')
    }
}

export function generateRefreshToken(email: string) {
    const secret =  process.env.TOKEN_SECRET
    if (secret) {
        return jwt.sign(email, secret, { expiresIn: '520m' });
    } else {
        return Error('don`t have secret')
    }
}