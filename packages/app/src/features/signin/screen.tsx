import { Button, XStack, YStack } from '@repo/ui'

interface SignInScreenProps {
  handleSignIn: () => void
}

export function SignInScreen({ handleSignIn }: SignInScreenProps) {
  return (
    <YStack flex={1} justify="center" items="center" gap="$8" p="$4" bg="$background">
      <XStack
        position="absolute"
        width="100%"
        t="$6"
        gap="$6"
        justify="center"
        flexWrap="wrap"
        $sm={{ position: 'relative', t: 0 }}
      >
        <Button onPress={handleSignIn}>Sign In</Button>
      </XStack>
    </YStack>
  )
}
