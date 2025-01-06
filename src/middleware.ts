import Cookies from 'js-cookie';
import {NextRequest, NextResponse} from 'next/server';

export default function middleware(request: NextRequest) {
    const token = Cookies.get('authorized');
    console.log('Token:', token); // Debugging: Print token to console

    if (!token) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/todoList'],
};
