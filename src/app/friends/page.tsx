'use client'

import { FriendCard } from '@/components/Cards/FriendCard'
import { AppContext } from '@/contexts/AppContext'

import { useContext } from 'react'

export default function Friends() {
  const { user } = useContext(AppContext)

  return (
    <div className="w-full mx-auto py-20">
      <div className="max-w-[1120px] w-full flex-1 mx-auto flex flex-col items-center">
        <h1 className="text-white text-[2.5rem] font-poppins font-semibold">
          Friends
        </h1>

        <ul className="w-full flex flex-col items-center gap-12 mt-10">
          {user?.friends?.map(({ username }, index) => {
            return <FriendCard key={index} friend={username} />
          })}
        </ul>
      </div>
    </div>
  )
}
