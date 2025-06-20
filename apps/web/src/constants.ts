export const NEXT_PUBLIC_HOST = new URL(process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000')

export const isSecureCookies = NEXT_PUBLIC_HOST.protocol.startsWith('https:')
export const cookiePrefix = isSecureCookies ? '__Secure-' : ''
