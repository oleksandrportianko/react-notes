import jwt from "jsonwebtoken"

export const generateAccessToken = (email: string) => {
    const secret =  process.env.TOKEN_SECRET

    if (secret) {
        try {
            return jwt.sign({ email }, secret, { expiresIn: '3h' });
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

export const verifyAccessToken = (token: string): string => {
    const secret =  process.env.TOKEN_SECRET

    if (secret) {
        try {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    return 'Error in decode'
                }

                return (<any>decoded).email
            });
        } catch (error) {
            console.log('Error while verify access token', error)
            return 'Error in decode'
        }
    }

    return 'Don`t have secret'
}