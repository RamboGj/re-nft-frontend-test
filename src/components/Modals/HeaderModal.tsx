'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { List, X } from '@phosphor-icons/react'
import { NavigationItem } from '../NavigationLink'
import { usePathname } from 'next/navigation'

interface HeaderModalProps {
  navigation: {
    label: string
    href: string
  }[]
}

export function HeaderModal({ navigation }: HeaderModalProps) {
  const activeUrl = usePathname()

  return (
    <div className="md:hidden">
      <Dialog.Root key={activeUrl}>
        <Dialog.Trigger>
          <List
            className="text-pink500 hover:text-pink600 hover:scale-105 transition duration-300 cursor-pointer"
            size={48}
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 left-0 bottom-0 right-0 bg-black/90 z-50 lg:hidden">
            <Dialog.Content className="max-w-[596px] flex flex-col items-end justify-end w-full rounded-[20px] p-8 fixed top-0 right-0">
              <Dialog.Trigger>
                <X
                  className="text-pink500 hover:text-pink600 hover:scale-105 transition duration-300 cursor-pointer"
                  size={48}
                />
              </Dialog.Trigger>

              <ul className="flex flex-col items-start gap-6 mt-16">
                {navigation.map((navItem) => {
                  return <NavigationItem key={navItem.href} {...navItem} />
                })}
              </ul>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
