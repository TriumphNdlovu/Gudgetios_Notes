'use client';
import { CheckboxGroup, Checkbox, Button, Input, Divider } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Todo } from '../interfaces/TodoList';
import { getTodos, addTodo, removeTodo, toggleTodo } from '../services/TodoService';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleAddTodo = () => {
    addTodo(newTodo).then(getTodos).then(setTodos);
    setNewTodo('');
  };

  const handleRemoveTodo = (index: number) => {
    removeTodo(index).then(getTodos).then(setTodos);
  };

  const handleToggleTodo = (index: number) => {
    toggleTodo(index).then(getTodos).then(setTodos);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter Todo here"
          style={{ marginRight: '10px' }}
        />
        <Button onClick={handleAddTodo}> + </Button>
      </div>

      <Divider />

      <CheckboxGroup
        description="Check off what you have done"
        label="Select todos"
      >
        {todos.map((todo, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Checkbox value={index.toString()} checked={todo.completed} onChange={() => handleToggleTodo(index)}>
              {todo.content}
            </Checkbox>
            <Button onClick={() => handleRemoveTodo(index)}>Remove</Button>
          </div>
        ))}
      </CheckboxGroup>
    </div>
  );
}