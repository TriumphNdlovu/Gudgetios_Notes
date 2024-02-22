
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

  export const deleteNote = async (uniqueId: string): Promise<void> => {
    const supabase = createClient(cookies());
  
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('uniqueId', uniqueId);
  
    if (error) {
      throw error;
    }
  };
  

  export const updateNote = async (theNote: Note, noteID: string): Promise<void> => {
    const supabase = createClient(cookies());
    const { error } = await supabase
      .from('notes')
      .update({ title: theNote.title, content: theNote.content, created_at: new Date()})
      .eq('uniqueId', noteID);
  
    if (error) throw error;
  }


