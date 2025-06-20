import { useEffect, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from '@repo/app/src/provider'
import { NativeToast } from '@repo/ui'
import { Auth0Provider } from 'react-native-auth0'
import { useAuth } from '../hooks/auth'

export const unstable_settings = {
  // Ensure that reloading on `/user` keeps a back button present.
  initialRouteName: 'Home',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const colorScheme = useColorScheme()

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Auth0Provider
          domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN}
          clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
        >
          <RootLayoutNav />
          <NativeToast />
        </Auth0Provider>
      </ThemeProvider>
    </Provider>
  )
}

function RootLayoutNav() {
  const { user, isLoading } = useAuth()
  const isLoggedIn = useMemo(() => !!user, [user])

  if (isLoading) return

  return (
    <Stack>
      {/* unauthenticated */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="signin" />
      </Stack.Protected>

      {/* authenticated */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(protected)/user/[id]" />
      </Stack.Protected>
    </Stack>
  )
}
