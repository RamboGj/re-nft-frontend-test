import { PostProps } from '@/@types/app'

export function onSortByNewestDate(posts: PostProps[]) {
  return posts?.sort(
    (postA, postB) =>
      new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime(),
  )
}
