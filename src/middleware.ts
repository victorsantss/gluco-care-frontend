import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest): NextResponse | undefined {
  const userToken = request.cookies.get('userToken')?.value
  const userTokenExists = userToken !== undefined

  if (userTokenExists && ['/', '/account/new'].includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/menu'
    return NextResponse.redirect(url)
  }

  if (!userTokenExists && !['/', '/account/new'].includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/((?!api/auth|api/v1|_next/static|_next/image|favicon.ico).*)']
}
