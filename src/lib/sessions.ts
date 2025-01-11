import {JWTPayload, jwtVerify, SignJWT} from "jose";
import 'server-only'
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export interface SessionData {
    name?: string;
    email?: string;
    password?: string;
}

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export const encrypt = async (payload: JWTPayload | undefined) => {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('20 sec from now')
        .sign(key)
}

export const decrypt = async (input: string) => {
    const {payload} = await jwtVerify(input, key, {algorithms: ['HS256']})
    return payload;
}

export const login = async (data: SessionData) => {
    const user = {email: data.email, name: data.name || '', password: data.password}

    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({user, expires});

    const cookiesStore = await cookies();
    cookiesStore.set('session', session, {expires, httpOnly: true})
}

export const logout = async () => {
    const cookiesStore = await cookies();
    cookiesStore.set('session', '', {expires: new Date(0)})
}

export const getSession = async () => {
    const cookiesStore = await cookies();
    const session = cookiesStore.get('session')?.value;
    if (!session) return null;
    return await decrypt(session)
}

export const updateSession = async (request: NextRequest) => {
    const session = request.cookies.get('session')?.value;
    if (!session) return NextResponse.redirect(new URL('/auth', request.url));

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);

    const response = NextResponse.next();
    response.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as Date
    })
    return response
}




