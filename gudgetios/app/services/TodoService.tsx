// todoService.ts
import { Todo } from '../interfaces/TodoList';

// This is a mock database. Replace it with your actual database.
let todos: Todo[] = [
  { content: 'First todo', completed: false },
  { content: 'Second todo', completed: false },
];

export const getTodos = (): Promise<Todo[]> => {
  return Promise.resolve(todos);
};

export const addTodo = (content: string): Promise<void> => {
  todos.push({ content, completed: false });
  return Promise.resolve();
};

export const removeTodo = (index: number): Promise<void> => {
  todos = todos.filter((_, todoIndex) => todoIndex !== index);
  return Promise.resolve();
};

export const toggleTodo = (index: number): Promise<void> => {
  todos = todos.map((todo, todoIndex) => todoIndex === index ? { ...todo, completed: !todo.completed } : todo);
  return Promise.resolve();
};