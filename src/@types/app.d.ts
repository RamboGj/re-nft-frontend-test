export interface UserProps {
  username: string
  password: string
  friends: {
    username: string
  }[]
}

export interface PostProps {
  message: string
  username: string
  createdAt: Date
}
