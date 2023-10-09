export interface UserProps {
  username: string | undefined
  password: string | undefined
  friends: {
    username: string
  }[]
}

export interface PostProps {
  message: string
  username: string
  createdAt: Date
}
