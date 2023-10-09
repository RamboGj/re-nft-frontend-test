'use client'

import { PostCard } from '@/components/Cards/PostCard'
import { AppContext } from '@/contexts/AppContext'

import { useContext } from 'react'

export default function Feed() {
  const { user, posts } = useContext(AppContext)

  const postsToShow = posts
    ?.filter((post) => {
      return user?.friends?.some((friend) => friend.username === post.username)
    })
    .sort(
      (postA, postB) =>
        new Date(postB.createdAt).getTime() -
        new Date(postA.createdAt).getTime(),
    )

  return (
    <div className="w-full mx-auto py-20">
      <div className="max-w-[1120px] w-full flex-1 mx-auto flex flex-col items-center">
        <h1 className="text-white text-[2.5rem] font-poppins font-semibold">
          Feed
        </h1>

        <ul className="w-full flex flex-col items-center gap-12 mt-10">
          {postsToShow?.map(({ createdAt, message, username }, index) => {
            const date = new Date(createdAt)
            const formattedDate = date?.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
            return (
              <PostCard
                key={index}
                creator={username}
                message={message}
                date={formattedDate}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
