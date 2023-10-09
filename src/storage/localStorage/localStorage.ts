import { UserProps } from '@/@types/app'
import { LOCAL_STORAGE } from './localStorageKeys'
import toast from 'react-hot-toast'

export function onVerifyIfUserAlreadyExists(username: string) {
  const existentUsers = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.USERS)),
  )

  if (existentUsers !== null) {
    const userAlreadyExist = existentUsers.filter((user: UserProps) => {
      const isEqual = Object.is(username, user.username)

      return isEqual
    })

    if (userAlreadyExist.length > 0) {
      toast.error('User already exist.')
      throw new Error('User already exist.')
    }
  }
}

export function onSaveUserOnLocalStorage(username: string, password: string) {
  onVerifyIfUserAlreadyExists(username)

  const existentUsers = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.USERS)),
  )

  const user = {
    username,
    password,
    friends: [],
  }

  if (existentUsers !== null) {
    localStorage.setItem(
      LOCAL_STORAGE.USERS,
      JSON.stringify([...existentUsers, user]),
    )
  } else {
    localStorage.setItem(LOCAL_STORAGE.USERS, JSON.stringify([user]))
  }
}
