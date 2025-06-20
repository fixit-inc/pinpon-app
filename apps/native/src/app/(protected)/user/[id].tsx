import { UserDetailScreen } from '@repo/app/src/features/user/detail-screen'
import { Stack } from 'expo-router'
import { useParams } from 'solito/navigation'
import { useAuth } from '../../../hooks/auth'

export default function Screen() {
  const { id } = useParams<{ id: string }>()
  const { signOut } = useAuth()

  return (
    <>
      <Stack.Screen
        options={{
          title: 'User',
          presentation: 'modal',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <UserDetailScreen id={id} handleSignOut={signOut} />
    </>
  )
}
