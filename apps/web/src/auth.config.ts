import { NextAuthConfig } from 'next-auth'
import Auth0 from 'next-auth/providers/auth0'

export default {
  providers: [Auth0],
} satisfies NextAuthConfig
