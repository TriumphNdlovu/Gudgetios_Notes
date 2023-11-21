'use client';
import { getCurrentUserId, removeTodo } from '../repository/TodoCrud';
import { Todo } from '../interfaces/TodoList';
import { createClient } from '@/utils/supabase/server';
import {
          getTodos,
          addTodo,
          toggleTodo
        } from '../repository/TodoCrud';

export const getTodosService = async (): Promise<Todo[]> => {
  return getTodos();
};

export const addTodoService = async (content: string,dueDate: Date): Promise<void> => {

  addTodo(content,dueDate);

};

export const removeTodoService = async (uniqueId:string): Promise<void> => {
  removeTodo(uniqueId);
};

export const toggleTodoService = async (completed: boolean , uniqueId:string): Promise<void> => {

  toggleTodo(completed , uniqueId);
 
};

