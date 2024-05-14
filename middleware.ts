import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
// const protectedRoutes = ['/profile']
// const publicRoutes = ['/login', '/not-found']

// temporary routes
const protectedRoutes: string[] = []
const publicRoutes = ['/']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  console.log(path)
  // const isProtectedRoute = protectedRoutes.includes(path)
  let isProtectedRoute = false
  for (let i = 0; i < protectedRoutes.length; i++) {
    const element = protectedRoutes[i]
    if (path.startsWith(element)) {
      isProtectedRoute = true
      console.log('Route is protected', path)
    }
  }
  // const isPublicRoute = publicRoutes.includes(path)
  let isPublicRoute = false
  for (let i = 0; i < publicRoutes.length; i++) {
    const element = publicRoutes[i]
    if (path.startsWith(element)) {
      isPublicRoute = true
      console.log('Route is public', path)
    }
  }

  // Check if there is not an intersection
  if (!isPublicRoute && !isProtectedRoute && path !== '/') {
    return NextResponse.redirect(new URL('/not-found', req.nextUrl))
  }

  // 4. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  // 6. Check the root route
  // if (!session?.userId && path === '/') {
  //   console.log('protected root by middleware')
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    console.log('protected route by middleware')
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
