
'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkuser() {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user ? true : false;
}

export async function signOut() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()

    console.log('Signed out');
    return redirect('/login')
}

export async function EditProfile() {

    console.log('Edit Profile');
}

export async function getProfileDetails() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()
    const username = user?.user_metadata?.username
    const email = user?.email
    
    return {username,email}
}

