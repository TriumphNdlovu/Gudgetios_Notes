import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { FaArrowLeft, FaBackward, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Input, Image } from '@nextui-org/react'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('../../login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default button click action
    alert('Sign Up');
    return redirect('../../Pages/Register');
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col bg-blue-700 p-8 rounded-md shadow-md">
        <div className="mb-8 text-center">
        <div className='text-4xl font-black'>
          Gudgetios.
        </div>
        <div className='text-2xl text-black'>
          Welcome Back!
          <br></br>
          Enter Your credencial to continue.

        </div>

        </div>

        <form
          className="flex flex-col gap-4 text-foreground"
          action={signIn}
        >
          <Input
            name="email"
            isRequired
            type="email"
            label="Email"
            placeholder="Enter your Email"
            labelPlacement="outside"
          />

          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="•••••••••••"
            type="password"
            labelPlacement="outside"
          />

          <button className="bg-green-700 rounded-md px-4 py-2 text-white mb-2">
            Sign In
          </button>

          <button
            type="button"
            onClick={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          >
            Sign Up
          </button>

          {searchParams?.message && (
            <p className="p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
