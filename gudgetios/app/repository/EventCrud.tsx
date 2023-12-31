'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { EVENT } from '../interfaces/Events';

export const getCurrentUserId = async (): Promise<string> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  return user?.data?.user?.id?.toString() || '';
};

export const generateUniqueId = async() =>
{

  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);

  return uniqueId;
}

export const getEvents = async (): Promise<EVENT[]> => { 
  const userId = (await getCurrentUserId()).toString();
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('Events')
    .select('*')
    .eq('user_id', userId);

    console.log("Events " + data!.length);

  if (error) 
  throw error;

  return data || [];
};

export const addEvent = async (title: string, startdate: Date, enddate: Date, description: string, time: string ): Promise<void> => {

  const user_id = (await getCurrentUserId()).toString();
  const supabase = createClient(cookies());
  const uniqueId = await generateUniqueId();
  const { error } = await supabase
    .from('Events')
    .insert([{ title, startdate, enddate, user_id, uniqueId, description, time, completed: false }]);

  if (error) throw error;
};

export const completeEvent = async (uniqueId: string): Promise<void> => {
  const supabase = createClient(cookies());
  const { error } = await supabase
    .from('Events')
    .update({ completed: true })
    .match({ uniqueId });

  if (error) throw error;
};


