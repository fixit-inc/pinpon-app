'use client'

import { UserDetailScreen } from '@repo/app/src/features/user/detail-screen'
import { signOut } from 'next-auth/react'
import { useParams } from 'solito/navigation'

export default function Page() {
  const { id } = useParams<{ id: string }>()

  const handleSignOut = async () => {
    await signOut({ redirectTo: '/' })
  }

  return <UserDetailScreen id={id} handleSignOut={handleSignOut} />
}
