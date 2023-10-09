'use client'

import { AppContext } from '@/contexts/AppContext'
import { SESSION_STORAGE } from '@/storage/sessionStorage/sessionStorageKeys'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function Signout() {
  const { push } = useRouter()

  const { setIsLoggedIn } = useContext(AppContext)

  useEffect(() => {
    sessionStorage.removeItem(SESSION_STORAGE.LOGGED_IN_USER)
    toast.success('Successfully logged out.')
    setIsLoggedIn(false)
    push('/')
  }, [])

  return null
}
