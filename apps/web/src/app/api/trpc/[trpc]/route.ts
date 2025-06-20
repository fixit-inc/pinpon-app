import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@repo/api'
import { NextRequest } from 'next/server'

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
  })
}

export const GET = handler
export const POST = handler
