'use client';
import { editTodo, getCurrentUserId, removeTodo } from '../repository/TodoCrud';
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

export const addTodoService = async (content: string,dueDate: String): Promise<void> => {

  addTodo(content,dueDate);

};

export const removeTodoService = async (uniqueId:string): Promise<void> => {
  removeTodo(uniqueId);
};

export const toggleTodoService = async (completed: boolean , uniqueId:string): Promise<void> => {

  toggleTodo(completed , uniqueId);
 
};

export const editTodoService = async (content: string , dueDate: string , uniqueId:string): Promise<void> => {
  editTodo(content , dueDate , uniqueId);
};

