
'use server'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Profile } from '../interfaces/Profile';

export const getCurrentUserId = async (): Promise<string> => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await supabase.auth.getUser();
    return user?.data?.user?.id?.toString() || '';
  };

export const getProfileDetails = async (): Promise<any> => {
  const userId = (await getCurrentUserId()).toString();
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('UserProfile')
    .select('*')
    .eq('uniqueId', userId);

  if (error) throw error;

  return data![0];
}

