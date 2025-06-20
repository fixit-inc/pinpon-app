'use client'

import { SignInScreen } from '@repo/app/src/features/signin/screen'
import { signIn } from 'next-auth/react'

export default function Page() {
  const handleSignIn = async () => {
    await signIn('auth0')
  }

  return <SignInScreen handleSignIn={handleSignIn} />
}
