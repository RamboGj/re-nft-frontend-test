'use client'

import { PostCard } from '@/components/Posts/PostCard'
import { AppContext } from '@/contexts/AppContext'
import { useContext } from 'react'

export default function Home() {
  const { sortedByNewestPosts } = useContext(AppContext)

  return (
    <div className="w-full mx-auto py-20">
      <div className="max-w-[1120px] w-full flex-1 mx-auto flex flex-col items-center">
        <ul className="w-full flex flex-col items-center gap-12">
          {sortedByNewestPosts?.map(
            ({ createdAt, message, username }, index) => {
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
            },
          )}
        </ul>
      </div>
    </div>
  )
}
