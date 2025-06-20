import { UserSchema, createUserRepository, createUserService } from '@repo/model'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../../lib/trpc'

const userRepository = createUserRepository()
const userService = createUserService(userRepository)

const findById = publicProcedure
  .input(UserSchema.pick({ id: true }))
  .output(UserSchema.nullable())
  .query(async ({ input }) => {
    try {
      const user = await userService.get(input.id)
      return user
    } catch (error) {
      console.log(error)
      throw new TRPCError({ code: 'NOT_FOUND', cause: error })
    }
  })

export const userRouter = router({
  findById,
})
