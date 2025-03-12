import { NextResponse } from 'next/server';

export function middleware(request) {
  const hasToken = request.cookies.has('accessToken');
  const url = new URL(request.url);
  const path = url.pathname;

  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'local' && path.includes('/guide')) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.headers.set(`x-middleware-cache`, `no-cache`);
    return response;
  }

  if (!hasToken && !path.includes('/login')) {
    const response = NextResponse.rewrite(new URL('/login', request.url));
    response.headers.set(`x-middleware-cache`, `no-cache`);
    return response;
  } else if (hasToken && path === '/login') {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.headers.set(`x-middleware-cache`, `no-cache`);
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/'],
};
