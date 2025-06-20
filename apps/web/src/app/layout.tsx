import type { Metadata } from 'next'
import { NextTamaguiProvider } from '@repo/app/src/provider/next-tamagui-provider'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Tamagui • App Router',
  description: 'Tamagui, Solito, Expo & Next.js',
  icons: '/favicon.ico',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <NextTamaguiProvider>{children}</NextTamaguiProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
