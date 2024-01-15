'use client';
import { editTodo, getCurrentUserId, removeTodo } from '../repository/TodoCrud';
import { Todo, UPDATES } from '../interfaces/TodoList';
import { createClient } from '@/utils/supabase/server';
import {
          getTodos,
          addTodo,
          toggleTodo
        } from '../repository/TodoCrud';
import { data } from 'autoprefixer';
import { getEvents } from '../repository/EventCrud';

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

export const getUpdatesService = async (): Promise<UPDATES> => {

  const data = await getTodos();
  let Active = 0;
  let Completed = 0;
  let Overdue = 0;
  let Total = 0;
  let ActiveEvents = 0;
  let TodayEvents = 0;
  let ThisMonthEvents = 0;

  data.forEach((todo) => {
    if (todo.completed === false) {
      Active++;
    }
    if (todo.completed === true) {
      Completed++;
    }
    if (todo.due < new Date()) {
      Overdue++;
    }
    Total++;
  });

  const eventsdata = await getEvents();

  eventsdata.forEach((event) => {

    console.table(event);
    if (event.completed === false) {
      ActiveEvents++;
    }
    if (event.startdate >= new Date() && event.startdate <= new Date()) {
      TodayEvents++;
    }
    if (event.enddate < new Date()) {
      ThisMonthEvents++;
    }
  });


  return {
    Active,
    Completed,
    Overdue,
    Total,
    ActiveEvents,
    TodayEvents,
    ThisMonthEvents,
  };
}




