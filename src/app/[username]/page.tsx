'use client'

import { PostCard } from '@/components/Cards/PostCard'
import { AppContext } from '@/contexts/AppContext'
import {
  onAddFriend,
  onRemoveFriend,
} from '@/storage/localStorage/localStorage'
import { useContext } from 'react'

export default function UserPage({ params }: { params: { username: string } }) {
  const { user, setUser, posts } = useContext(AppContext)

  const isOwnUser = user?.username === params.username

  const isAlreadyAFriend =
    typeof user?.friends?.filter((friend) => {
      return friend.username === params.username
    })[0] !== 'undefined'

  const postsToShow = posts
    ?.filter((post) => {
      return post.username === params.username
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
          User:{' '}
          <strong className="text-pink500 font-semibold">
            {params.username}
          </strong>
        </h1>
        {isOwnUser ? null : (
          <button
            onClick={() => {
              if (!isAlreadyAFriend) {
                const updatedUser = onAddFriend(params.username)
                setUser(updatedUser)
              } else {
                const updatedUser = onRemoveFriend(params.username)
                setUser(updatedUser)
              }
            }}
            className="mt-5 px-5 bg-pink500 rounded-lg h-[50px] font-poppins font-semibold text-white hover:bg-pink600 transition-colors duration-300"
          >
            {isAlreadyAFriend ? 'Unfriend' : 'Befriend'}
          </button>
        )}
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
