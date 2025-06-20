declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: 'production' | 'development' | 'test'
        EXPO_PUBLIC_AUTH0_DOMAIN: string
        EXPO_PUBLIC_AUTH0_CLIENT_ID: string
      }
    }
  }
}
