'use client'

import { NavigationItem } from '../NavigationLink'
import { useContext } from 'react'
import { AppContext } from '@/contexts/AppContext'
import Link from 'next/link'

export interface NavigationItemProps {
  href: string
  label: string
}

export function Header() {
  const { isLoggedIn, user } = useContext(AppContext)

  const authenticatedNavigationItems: NavigationItemProps[] = [
    {
      label: 'My feed',
      href: '/feed',
    },
    {
      label: 'My friends',
      href: '/friends',
    },
    {
      label: 'My profile',
      href: `/${user?.username}`,
    },
    {
      label: 'Sign out',
      href: '/signout',
    },
  ]

  const unauthenticatedNavigationItems: NavigationItemProps[] = [
    {
      label: 'Sign in',
      href: '/signin',
    },

    {
      label: 'Sign up',
      href: '/signup',
    },
  ]

  return (
    <header className="w-full">
      <div className="max-w-[1240px] px-8 flex items-center justify-between py-8 mx-auto">
        <Link href="/">
          <h1 className="font-poppins font-black text-pink500 text-[2.5rem]">
            F
          </h1>
        </Link>
        <ul className="flex items-center gap-12">
          {isLoggedIn ? (
            <>
              {authenticatedNavigationItems.map((navItem) => {
                return <NavigationItem key={navItem.href} {...navItem} />
              })}
            </>
          ) : (
            <>
              {unauthenticatedNavigationItems.map((navItem) => {
                return <NavigationItem key={navItem.href} {...navItem} />
              })}
            </>
          )}
        </ul>
      </div>
    </header>
  )
}
