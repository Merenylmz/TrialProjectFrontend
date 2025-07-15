
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export default function Middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuth = request.cookies.get("isAuth")?.value;
  
  if (isAuth == "1" && token && (request.nextUrl.pathname === "/auth/login" || request.nextUrl.pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuth != "1" && !token && (request.nextUrl.pathname === '/auth/profile' || request.nextUrl.pathname === '/auth/myblogs' || request.nextUrl.pathname === '/blogs/create' || request.nextUrl.pathname === '/categories/create')) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/login',
    '/auth/register',
    '/blogs/create',
    '/auth/profile',
    '/auth/myblogs',
    '/categories/create'
  ]
};
