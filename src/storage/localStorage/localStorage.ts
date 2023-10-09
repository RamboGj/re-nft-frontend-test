import { PostProps, UserProps } from '@/@types/app'
import { LOCAL_STORAGE } from './localStorageKeys'
import toast from 'react-hot-toast'
import { SESSION_STORAGE } from '../sessionStorage/sessionStorageKeys'

export function onVerifyIfUserAlreadyExists(username: string) {
  const existentUsers = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.USERS)),
  )

  if (existentUsers !== null) {
    const userAlreadyExist = existentUsers.filter((user: UserProps) => {
      const isEqual = user.username === username

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

export function onSiginUser(username: string, password: string) {
  const existentUsers: UserProps[] | null = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.USERS)),
  )

  const user = {
    username,
    password,
  }

  if (existentUsers !== null) {
    const userFound = existentUsers.filter((userFiltered) => {
      const userIsEqual =
        user.username === userFiltered.username &&
        user.password === userFiltered.password

      return userIsEqual
    })

    if (userFound.length > 0) {
      toast.success('Successfully logged in.')
      sessionStorage.setItem(
        SESSION_STORAGE.LOGGED_IN_USER,
        JSON.stringify(userFound[0]),
      )
      return userFound[0]
    } else {
      toast.error('An user with these data was not found.')
      throw new Error('There is no user save on storage.')
    }
  } else {
    throw new Error('There is no user save on storage.')
  }
}

export function onPostMessage(message: string) {
  const existentPosts: PostProps[] | null = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.POSTS)),
  )

  console.log('existentPosts', existentPosts)

  const creator: UserProps | null = JSON.parse(
    String(sessionStorage.getItem(SESSION_STORAGE.LOGGED_IN_USER)),
  )

  console.log('creator', creator)

  const post: PostProps = {
    username: String(creator?.username),
    createdAt: new Date(),
    message,
  }

  if (existentPosts !== null) {
    localStorage.setItem(
      LOCAL_STORAGE.POSTS,
      JSON.stringify([...existentPosts, post]),
    )
    toast.success('Successfully posted.')
    return post
  } else {
    localStorage.setItem(LOCAL_STORAGE.POSTS, JSON.stringify([post]))
    toast.success('Successfully posted.')
    return post
  }
}

export function onGetAllPosts() {
  const existentPosts: PostProps[] | null = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.POSTS)),
  )

  if (existentPosts !== null) {
    return existentPosts
  } else {
    return []
  }
}

export function onAddFriend(username: string) {
  const loggedInUser: UserProps | null = JSON.parse(
    String(sessionStorage.getItem(SESSION_STORAGE.LOGGED_IN_USER)),
  )

  console.log('loggedInUser', loggedInUser)

  const allUsers: UserProps[] | null = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.USERS)),
  )

  console.log('allUsers', allUsers)

  const allButLoggedIn: UserProps[] | undefined = allUsers?.filter((user) => {
    return user.username !== loggedInUser?.username
  })

  console.log('allButLoggedIn', allButLoggedIn)

  const updatedLoggedInUser: UserProps | null = {
    username: loggedInUser?.username,
    password: loggedInUser?.password,
    friends: loggedInUser?.friends
      ? [
          ...loggedInUser?.friends,
          {
            username,
          },
        ]
      : [{ username }],
  }

  console.log('updatedLoggedInUser', updatedLoggedInUser)

  if (typeof allButLoggedIn !== 'undefined') {
    console.log('eNTROU')
    localStorage.setItem(
      LOCAL_STORAGE.USERS,
      JSON.stringify([...allButLoggedIn, updatedLoggedInUser]),
    )
    sessionStorage.setItem(
      SESSION_STORAGE.LOGGED_IN_USER,
      JSON.stringify(updatedLoggedInUser),
    )
    return updatedLoggedInUser
  } else {
    localStorage.setItem(
      LOCAL_STORAGE.USERS,
      JSON.stringify([updatedLoggedInUser]),
    )
    sessionStorage.setItem(
      SESSION_STORAGE.LOGGED_IN_USER,
      JSON.stringify(updatedLoggedInUser),
    )
    return updatedLoggedInUser
  }
}

export function onRemoveFriend(username: string) {
  const loggedInUser: UserProps | null = JSON.parse(
    String(sessionStorage.getItem(SESSION_STORAGE.LOGGED_IN_USER)),
  )

  const allUsers: UserProps[] | null = JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE.USERS)),
  )

  const allButLoggedIn: UserProps[] | undefined = allUsers?.filter((user) => {
    return user.username !== loggedInUser?.username
  })

  const allFriendsButRemoved = loggedInUser?.friends.filter((friend) => {
    return friend.username !== username
  })

  const updatedLoggedInUser: UserProps | null = {
    username: loggedInUser?.username,
    password: loggedInUser?.password,
    friends: allFriendsButRemoved || [],
  }

  if (typeof allButLoggedIn !== 'undefined') {
    localStorage.setItem(
      LOCAL_STORAGE.USERS,
      JSON.stringify([...allButLoggedIn, updatedLoggedInUser]),
    )
    sessionStorage.setItem(
      SESSION_STORAGE.LOGGED_IN_USER,
      JSON.stringify(updatedLoggedInUser),
    )
    return updatedLoggedInUser
  } else {
    localStorage.setItem(
      LOCAL_STORAGE.USERS,
      JSON.stringify([updatedLoggedInUser]),
    )
    sessionStorage.setItem(
      SESSION_STORAGE.LOGGED_IN_USER,
      JSON.stringify(updatedLoggedInUser),
    )
    return updatedLoggedInUser
  }
}
