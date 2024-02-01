import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createProfileService } from '@/app/services/ProfileService'
import { Input } from '@nextui-org/react'


export default function Register({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async() => {
    'use server'
    return redirect('../../Pages/login')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const displayname = email.split('@')[0];
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('../../Pages/login?message=Incorrect email or password')
    }
    else
    {
      // create the profile
      const theprofile = {
        firstname: formData.get('firstname') as string,
        lastname: formData.get('lastname') as string,
        Username:displayname,
        ProfilePic: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
      }
      createProfileService(theprofile);
    }

    return redirect('../../Pages/login?message=We sent you an email to confirm your account')
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col bg-blue-700 p-8 rounded-md shadow-md">
        <div className="mb-8 text-center">
        <div className='text-4xl font-black'>
          Gudgetios.
        </div>
          <div className='text-2xl text-black'>
            Welcome!
            <br></br>
            Enter Your credencial to SignUp.
          </div>
        </div>

      <form
        className="flex flex-col gap-4 text-foreground"
      >

            <Input
            name="firstname"
            isRequired
            type="text"
            label="firstname"
            placeholder="Jane"
            labelPlacement="outside"
          />

        {/* <label className="text-md" htmlFor="text">
          Firstname
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="firstname"
          placeholder="Jane"
          required
        /> */}

        {/* <label className="text-md" htmlFor="text">
          Lastname
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="lastname"
          placeholder="Doey"
          required
        /> */}

          <Input
            name="lastname"
            isRequired
            type="text"
            label="lastname"
            placeholder="Doe"
            labelPlacement="outside"
          />

        {/* <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        /> */}

          <Input
            name="email"
            isRequired
            type="email"
            label="email"
            placeholder="JaneDoe@Gudgetios.com"
            labelPlacement="outside"
          />

        {/* <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        /> */}

          <Input
            name="password"
            isRequired
            type="password"
            label="password"
            placeholder="••••••••"
            labelPlacement="outside"
          />

        <button
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          formAction={signUp}
        >
          Sign Up
        </button>

        <button className= " bg-blue-900 rounded-md px-4 py-2 text-foreground mb-2"
           formAction={signIn}
        >
          Sign In
        </button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
    </div>
  )
}
