'use client'

import { AppContext } from '@/contexts/AppContext'
import { PlusCircle, XCircle } from '@phosphor-icons/react'
import { useContext, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { onPostMessage } from '@/storage/localStorage/localStorage'

const addPostSchema = zod.object({
  message: zod
    .string()
    .min(3, 'Message is too short')
    .max(300, 'Message is too long'),
})

type AddPostSchemaData = zod.infer<typeof addPostSchema>

export function AddPost() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

  const { isLoggedIn, setPosts } = useContext(AppContext)

  const AddPostForm = useForm<AddPostSchemaData>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      message: '',
    },
  })

  const { register, handleSubmit } = AddPostForm

  function onPost(data: AddPostSchemaData) {
    console.log('data', data)

    const post = onPostMessage(data.message)
    setPosts((prev) => {
      if (prev) {
        return [...prev, post]
      } else {
        return [post]
      }
    })
    setIsModalOpened(false)
  }

  if (isLoggedIn) {
    return (
      <div className="w-full mx-auto flex justify-center">
        <Dialog.Root open={isModalOpened}>
          <Dialog.Trigger
            onClick={() => {
              setIsModalOpened(true)
            }}
          >
            <PlusCircle
              className="text-pink500 hover:text-pink600 hover:scale-105 transition duration-300 cursor-pointer"
              size={48}
            />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed top-0 left-0 bottom-0 right-0 bg-black/60 z-50">
              <Dialog.Content className="max-w-[596px] flex flex-col items-stretch w-full rounded-[20px] p-8 bg-gray900 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <form className="w-full" onSubmit={handleSubmit(onPost)}>
                  <header className="w-full flex items-center justify-between">
                    <div className="flex-1" />
                    <h1 className="text-white font-poppins font-semibold text-[2rem]">
                      Create Post
                    </h1>
                    <Dialog.Trigger
                      onClick={() => {
                        setIsModalOpened(false)
                      }}
                      className="flex-1 flex justify-end"
                    >
                      <XCircle
                        size={32}
                        className="text-pink500 hover:text-pink600 transition-colors duration-300"
                      />
                    </Dialog.Trigger>
                  </header>
                  <div className="w-full h-px mt-2 mb-4 bg-gray400" />

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-montserrat font-medium text-white"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      {...register('message')}
                      className="rounded-lg bg-gray700 font-medium border border-transparent placeholder:text-gray600 placeholder:font-regular text-white py-3 px-8 focus:outline-none hover:bg-gray900/60 focus:border-pink500 transition duration-500"
                      name="message"
                      id="message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-12 bg-pink500 rounded-lg h-[50px] font-poppins font-semibold text-white hover:bg-pink600 transition-colors duration-300"
                  >
                    Create post
                  </button>
                </form>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    )
  } else return null
}
