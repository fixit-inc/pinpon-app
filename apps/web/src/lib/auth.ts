import NextAuth, { NextAuthResult } from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { cookiePrefix, isSecureCookies } from '@/constants'

const prisma = new PrismaClient()

const nextAuthResult = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.name = token.name
        session.user.image = token.picture
      }
      return session
    },
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isSecureCookies,
      },
    },
  },
  ...authConfig,
})

export type { NextAuthResult }
/**
 * Reference: https://github.com/nextauthjs/next-auth/discussions/9950#discussioncomment-8605601
 */
export const auth: NextAuthResult['auth'] = nextAuthResult.auth
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
} = nextAuthResult
