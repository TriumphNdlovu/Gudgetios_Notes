import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createProfileService } from '@/app/services/ProfileService'


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
    <div className='flex justify-center items-center h-screen'>
    <div className="w-1/4">
      <Link
        href="/"
        className=" py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>
<div>
  <div>
    <p>
      Welcome to Gudgetios ;|
    </p>
  </div>
  </div>
      <div>
      <form
        className="animate-in flex flex-col w-full justify-center gap-2 text-foreground"
        action={signUp}
      >
        <label className="text-md" htmlFor="text">
          Firstname
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="firstname"
          placeholder="Jane"
          required
        />
        <label className="text-md" htmlFor="text">
          Lastname
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="lastname"
          placeholder="Doey"
          required
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <button
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
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
    </div>
  )
}
