import { auth as middleware, NextAuthResult } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { apiRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from './routes'
import { pathToRegexp } from 'path-to-regexp'

// ミドルウェア内で実行しないパス群
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

export default middleware((req) => {
  // 現在アクセスしているページのパス取得
  const pathname = req.nextUrl.pathname

  // 認証フラグ
  const isSignedIn = !!req.auth

  // 公開パス判定フラグ
  const publicRoutesAsRegex = publicRoutes.map((x) => pathToRegexp(x).regexp)
  const isPublicRoute = publicRoutesAsRegex.some((x) => x.test(pathname))

  // API パス判定フラグ
  const apiRoutesAsRegex = apiRoutes.map((x) => pathToRegexp(x).regexp)
  const isApiRoute = apiRoutesAsRegex.some((x) => x.test(pathname))

  // 認証パス判定フラグ
  const authRoutesAsRegex = authRoutes.map((x) => pathToRegexp(x).regexp)
  const isAuthRoute = authRoutesAsRegex.some((x) => x.test(pathname))

  // API パスの場合、即時解決
  if (isApiRoute) return NextResponse.next()

  // 公開パスの場合、即時解決
  if (isPublicRoute) return NextResponse.next()

  // 認証パスかつ認証済みの場合、デフォルトページにリダイレクト
  if (isAuthRoute && isSignedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
  }

  // 未認証の場合、認証ページへリダイレクト
  if (!isAuthRoute && !isSignedIn) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  return NextResponse.next()
}) as unknown as NextAuthResult['auth']
