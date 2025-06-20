import { createUserRepository, createUserService, UserCreateInputSchema } from '@repo/model'
import { publicProcedure, router } from '../../lib/trpc'

const createSession = publicProcedure.input(UserCreateInputSchema).mutation(async ({ input }) => {
  const userRepository = createUserRepository()
  const userService = createUserService(userRepository)
  const user = await userService.create(input)

  return user
})

export const authRouter = router({
  createSession,
})
