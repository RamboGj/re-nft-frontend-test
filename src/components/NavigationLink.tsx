import Link from 'next/link'
import { NavigationItemProps } from './Header'

export function NavigationItem({ href, label, ...rest }: NavigationItemProps) {
  return (
    <li {...rest}>
      <Link href={href}>
        <span className="text-lg font-montserrat text-white hover:text-pink500 transition-colors duration-300">
          {label}
        </span>
      </Link>
    </li>
  )
}
