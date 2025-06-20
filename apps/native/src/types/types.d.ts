import { config } from '@repo/ui-config'

export type Conf = typeof config

declare module '@repo/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
