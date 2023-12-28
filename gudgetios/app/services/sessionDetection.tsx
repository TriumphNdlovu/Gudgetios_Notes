'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getCurrentUserId } from '../repository/TodoCrud';

const supabase = createClient( cookies() );

export const sessionDetection = async () => 
{
    const userID = (await getCurrentUserId()).toString();
    const user = await supabase.auth.getSession()
    if (user) {
        // console.log(user);
        // console.log("user is signed in");
        // console.log("redirecting to home page");
        console.log("You are already logged in");
       
    }
    else {
        // console.log("user is not signed in");
        // console.log("redirecting to login page");
        console.log("You are not logged in");
        redirect('../../Pages/login');
    }

    
}