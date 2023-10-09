'use client'

interface PostCardProps {
  creator: string
  message: string
  date: string
}

export function PostCard({ creator, message, date }: PostCardProps) {
  return (
    <li className="w-full flex px-12 py-6 flex-col bg-gray700 rounded-[20px]">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-pink500"></div>
        <h3 className="text-[1.25rem] text-pink500 font-poppins font-semibold">
          {creator}
        </h3>
      </div>
      <p className="text-lg text-white font-montserrat font-light">{message}</p>
      <footer className="text-sm font-light mt-3 text-gray300">{date}</footer>
    </li>
  )
}
