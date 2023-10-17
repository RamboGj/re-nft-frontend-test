'use client'

import { PostCard } from '@/components/Cards/PostCard'
import { AppContext } from '@/contexts/AppContext'
import { onSortByNewestDate } from '@/utils/functions'

import { useContext } from 'react'

export default function Feed() {
  const { user, posts } = useContext(AppContext)

  const postsToShow = onSortByNewestDate(
    posts
      ? posts.filter((post) => {
          return user?.friends?.some(
            (friend) => friend.username === post.username,
          )
        })
      : [],
  )

  return (
    <div className="w-full mx-auto py-20 px-8">
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
