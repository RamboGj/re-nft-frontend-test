import Link from 'next/link'
import { NavigationItemProps } from './Header'

export function NavigationItem({ href, label }: NavigationItemProps) {
  return (
    <Link href={href}>
      <li className="">
        <span className="text-lg font-montserrat text-white hover:text-pink500 transition-colors duration-300">
          {label}
        </span>
      </li>
    </Link>
  )
}
