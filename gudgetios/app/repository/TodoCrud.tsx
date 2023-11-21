// SuperbaseClientConnection.tsx
'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Todo } from '../interfaces/TodoList';
import { v4 as uuidv4 } from 'uuid';

export const getCurrentUserId = async (): Promise<string> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  return user?.data?.user?.id?.toString() || '';
};

export const getTodos = async (): Promise<Todo[]> => { 
  const userId = (await getCurrentUserId()).toString();
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
};

export const addTodo = async (content: string, ): Promise<void> => {

  const user_id = (await getCurrentUserId()).toString();
  const supabase = createClient(cookies());
  const uniqueId = uuidv4();

  const { error } = await supabase
    .from('todos')
    .insert([{ content, completed: false, user_id, uniqueId }]);

  if (error) throw error;
};

export const removeTodo = async (uniqueId: string): Promise<void> => {

  const user_id = (await getCurrentUserId()).toString();
  const supabase = createClient(cookies());

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('uniqueId', uniqueId);

  if (error) throw error;
};

export const toggleTodo = async (completed: boolean , uniqueId:string) => {

    const user_id = (await getCurrentUserId()).toString();
    const supabase = createClient(cookies());
    const { error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('uniqueId', uniqueId);

  if (error) throw error;
};
