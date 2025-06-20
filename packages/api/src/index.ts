import { publicProcedure, router } from './lib/trpc'
import { authRouter } from './routes/auth/route'
import { userRouter } from './routes/user/route'

export const appRouter = router({
  health: publicProcedure.query(() => {
    console.log('health check')
    return { ok: true }
  }),
  auth: authRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
