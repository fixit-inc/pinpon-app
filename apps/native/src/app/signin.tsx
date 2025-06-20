import { SignInScreen } from '@repo/app/src/features/signin/screen'
import { Stack } from 'expo-router'
import { useAuth } from '../hooks/auth'

export default function Screen() {
  const { signIn } = useAuth()

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sign In',
        }}
      />
      <SignInScreen handleSignIn={signIn} />
    </>
  )
}
