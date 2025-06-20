declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: 'production' | 'development' | 'test'
        NEXT_PUBLIC_HOST: string
        AUTH_SECRET: string
        AUTH_AUTH0_ID: string
        AUTH_AUTH0_SECRET: string
      }
    }
  }
}
