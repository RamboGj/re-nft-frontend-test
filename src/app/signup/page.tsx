'use client'

import Input from '@/components/Input'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { onSaveUserOnLocalStorage } from '@/storage/localStorage/localStorage'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const signupSchema = zod
  .object({
    username: zod
      .string()
      .min(3, 'Username is too short')
      .max(99, 'Username is too long'),
    password: zod
      .string()
      .min(6, 'Password is too short')
      .max(99, 'Password is too long'),
  })
  .refine((data) => data.username.match(/^[a-zA-Z0-9_]+$/g), {
    message:
      'Your username must contain only alphanumeric characteres and underscores.',
    path: ['username'],
  })
  .refine((data) => !data.password.match(/(.)\1/g), {
    message:
      'Your password must not contain repeated characters consecutively.',
    path: ['password'],
  })

type SignupSchemaData = zod.infer<typeof signupSchema>

export default function Signup() {
  const { push } = useRouter()

  const SignupForm = useForm<SignupSchemaData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = SignupForm

  function onSignup(data: SignupSchemaData) {
    try {
      onSaveUserOnLocalStorage(data.username, data.password)
      toast.success('User created successfully.')
      push('/signin')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full mx-auto max-w-[1240px] px-8 flex flex-col items-center">
      <h1 className="font-poppins font-bold text-[3rem] text-pink300">
        Sign up
      </h1>
      <form
        onSubmit={handleSubmit(onSignup, (errors) => {
          console.log('errs', errors)
        })}
        className="max-w-[720px] h-[360px] w-full bg-gray800 rounded-[20px] shadow-md mt-12 px-10 py-8 flex flex-col items-stretch"
      >
        <div className="flex flex-col gap-y-4">
          <Input
            label="Username"
            id="username"
            placeholder="austin123_"
            {...register('username')}
            error={errors.username}
            errors={errors}
          />
          <Input
            label="Password"
            placeholder="123_123"
            id="password"
            {...register('password')}
            error={errors.password}
            errors={errors}
          />
        </div>

        <button
          type="submit"
          className="mt-auto bg-pink500 rounded-lg h-[50px] font-poppins font-semibold text-white hover:bg-pink600 transition-colors duration-300"
        >
          Sign up
        </button>
      </form>
    </div>
  )
}
