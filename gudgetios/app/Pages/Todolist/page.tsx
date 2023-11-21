
'use client'
import { CheckboxGroup, Checkbox, Button, Input, Divider } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Todo } from '../../interfaces/TodoList';
import { 
        getTodosService,
        addTodoService,
        removeTodoService,
        toggleTodoService 

      } from '../../services/TodoService';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  
    
  useEffect(() => {
    getTodosService().then(setTodos);
  }, []);
    


  const handleAddTodo = () => {
    
    addTodoService(newTodo).then(() => getTodosService()).then(setTodos);
      setNewTodo('');
    
  };

  const handleRemoveTodo = (uniqueId:string) => {

    removeTodoService(uniqueId).then(() => getTodosService()).then(setTodos);
  };
  
  const handleToggleTodo = (completed: boolean , uniqueId:string) => {
    
    const todoIndex = todos.findIndex(todo => todo.uniqueId === uniqueId);
    if (todoIndex === -1) return;

    const updatedTodos = [...todos];
    updatedTodos[todoIndex].completed = completed;

    setTodos(updatedTodos);

    toggleTodoService(!completed , uniqueId).then(() => {
    getTodosService().then(setTodos);
    });

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
            <Checkbox 
              value={todo.uniqueId} 
              checked={todo.completed} 
              onChange={() => handleToggleTodo(!todo.completed, todo.uniqueId )}
            >
                {todo.content}
            </Checkbox>

            <Button onClick={() => handleRemoveTodo(todo.uniqueId )}>Delete</Button>
          </div>
        ))}
      </CheckboxGroup>
    </div>
  );
}