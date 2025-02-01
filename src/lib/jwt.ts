import {jwtVerify, SignJWT} from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateJWT(userId: string) {
    return new SignJWT({userId})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secretKey)
}

export async function verifyJWT(token: string) {
    const {payload} = await jwtVerify(token, secretKey, {algorithms: ["HS256"]});
    return payload;
}