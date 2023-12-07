
'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Note } from '../interfaces/Notes';
import { generateUniqueId, getCurrentUserId } from './TodoCrud';


export const addNote = async (theNote : Note) : Promise<void> => 
{
    const user_id = (await getCurrentUserId());
    const supabase = createClient(cookies());
    const uniqueId = await generateUniqueId();
    const { error } = await supabase
    .from('notes')
    .insert([{ content: theNote.content, title: theNote.title, user_id, uniqueId}]);

    if (error) throw error;
}

export const getNotes = async (): Promise<Note[]> => { 
    const userId = (await getCurrentUserId()).toString();
    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId);
  
    if (error) throw error;
    return data || [];
  };


