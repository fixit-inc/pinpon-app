import { client } from '@repo/app/src/lib/trpc'
import { useCallback } from 'react'
import { useAuth0 } from 'react-native-auth0'

export function useAuth() {
  const auth0 = useAuth0()
  const { mutateAsync } = client.auth.createSession.useMutation()

  const signIn = useCallback(async () => {
    const session = await auth0.authorize()
    const user = auth0.user

    if (!session || !user) return

    await mutateAsync({
      accounts: {
        create: {
          access_token: session.accessToken,
          expires_at: session.expiresAt,
          id_token: session.idToken,
          refresh_token: session.refreshToken,
          scope: session.scope,
          token_type: session.tokenType,
          provider: 'auth0',
          type: 'oidc',
          providerAccountId: user.sub ?? '',
        },
      },
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified ? new Date() : null,
      image: user.picture,
    })
  }, [])

  const signOut = useCallback(auth0.clearSession, [])

  return { signIn, signOut, user: auth0.user, isLoading: auth0.isLoading }
}
