'use client'

import { AppContext } from '@/contexts/AppContext'
import { onRemoveFriend } from '@/storage/localStorage/localStorage'
import Link from 'next/link'
import { useContext } from 'react'

interface FriendCardProps {
  friend: string
}

export function FriendCard({ friend }: FriendCardProps) {
  const { setUser } = useContext(AppContext)

  return (
    <li className="w-full flex px-12 py-6 flex-col bg-gray700 rounded-[20px]">
      <div className="flex items-center justify-between">
        <Link href={`/${friend}`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink500"></div>
            <h3 className="text-[1.25rem] text-pink500 font-poppins font-semibold">
              {friend}
            </h3>
          </div>
        </Link>
        <button
          onClick={() => {
            const updatedUser = onRemoveFriend(friend)
            setUser(updatedUser)
          }}
          className="px-5 bg-pink500 rounded-lg h-[50px] font-poppins font-semibold text-white hover:bg-pink600 transition-colors duration-300"
        >
          Unfriend
        </button>
      </div>
    </li>
  )
}
