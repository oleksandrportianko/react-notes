import jwt, { JwtPayload } from "jsonwebtoken"
import { decode } from "punycode";

export const generateAccessToken = (email: string) => {
    const secret =  process.env.TOKEN_SECRET

    if (secret) {
        try {
            return jwt.sign({ email }, secret, { expiresIn: '1m' });
        } catch (error) {
            console.log('Error while generate access token', error)
        }
    }
}

export const generateRefreshToken = (email: string) => {
    const secret =  process.env.TOKEN_SECRET

    if (secret) {
        try {
            return jwt.sign({ email }, secret, { expiresIn: '24h' });
        } catch (error) {
            console.log('Error while generate refresh token', error)
        }
    }
}

type VerifyResponse = {
    error: string,
    email: string
}

export const verifyAccessToken = (token: string): VerifyResponse | void => {
    const secret =  process.env.TOKEN_SECRET

    if (secret) {
        try {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    return { error: err, email: null }
                }
                return { error: null, email: (<any>decoded).email }
            });
        } catch (error) {
            console.log('Error while verify access token', error)
        }
    }
}