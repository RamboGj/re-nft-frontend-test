'use client'

import { PostProps, UserProps } from '@/@types/app'
import { onGetAllPosts } from '@/storage/localStorage/localStorage'
import { SESSION_STORAGE } from '@/storage/sessionStorage/sessionStorageKeys'
import { onSortByNewestDate } from '@/utils/functions'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface AppContextProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>

  posts: PostProps[] | null
  setPosts: Dispatch<SetStateAction<PostProps[] | null>>

  user: UserProps | null
  setUser: Dispatch<SetStateAction<UserProps | null>>

  sortedByNewestPosts: PostProps[] | undefined
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextProps)

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn =
        JSON.parse(
          String(sessionStorage.getItem(SESSION_STORAGE.LOGGED_IN_USER)),
        ) !== null

      return isLoggedIn
    } else {
      return false
    }
  })

  const [posts, setPosts] = useState<PostProps[] | null>(() => {
    if (typeof window !== 'undefined') {
      const posts = onGetAllPosts()

      return posts
    } else return []
  })

  const [user, setUser] = useState<UserProps | null>(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(
        String(sessionStorage.getItem(SESSION_STORAGE.LOGGED_IN_USER)),
      )

      return user
    } else {
      return null
    }
  })

  const sortedByNewestPosts = onSortByNewestDate(posts || [])

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        posts,
        setPosts,
        user,
        setUser,
        sortedByNewestPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
