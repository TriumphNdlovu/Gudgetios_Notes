'use client';
import { CheckboxGroup, Checkbox, Button, Input, Divider } from "@nextui-org/react";
import React, { useState } from "react";
import { Todo } from '../interfaces/TodoList';

export default function TodoList({ todos: initialTodos }: { todos: Todo[] }) {

  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    setTodos([...todos, { content: newTodo, completed: false }]);
    setNewTodo('');
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Name Todo List</h1>
      
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter Task here"
                style={{ marginRight: '50px' }} // Add some space between the input and the button
            />
            <Button onClick={addTodo} className=""> + </Button>
        </div>
      

      <CheckboxGroup
        description="Check off what you have done"
        label="Select todos"
        onValueChange={(value) => {}}
      >
        {todos.map((todo, index) => (
            <div >
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Checkbox value={index.toString()}>
                        {todo.content}
                    </Checkbox>
                    <Button onClick={() => removeTodo(index)}>Remove</Button>
                    </div>
                <Divider className="my-4" />
            </div>
          
        ))}
      </CheckboxGroup>
    </div>
  );
}