'use client'

import { NavigationItem } from '../NavigationLink'
import { useContext, useState } from 'react'
import { AppContext } from '@/contexts/AppContext'
import Link, { LinkProps } from 'next/link'
import { HeaderModal } from '../Modals/HeaderModal'

export interface NavigationItemProps extends LinkProps {
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

  const navigation = isLoggedIn
    ? authenticatedNavigationItems
    : unauthenticatedNavigationItems

  return (
    <header className="w-full">
      <div className="max-w-[1240px] px-8 flex items-center justify-between py-8 mx-auto">
        <Link href="/">
          <h1 className="font-poppins font-black text-pink500 text-[2.5rem]">
            F
          </h1>
        </Link>
        <ul className="hidden md:flex items-center gap-12">
          {navigation.map((navItem) => {
            return <NavigationItem key={navItem.href} {...navItem} />
          })}
        </ul>

        <HeaderModal navigation={navigation} />
      </div>
    </header>
  )
}
