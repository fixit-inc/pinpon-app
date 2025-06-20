import { defineUserFactory } from '@/prisma/generated/fabbrica'
import { faker } from '@faker-js/faker'

export const userFactory = defineUserFactory({
  defaultData: () => ({
    email: faker.internet.email(),
    name: faker.internet.displayName(),
  }),
})
