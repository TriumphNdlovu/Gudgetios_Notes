
'use client'
import { CheckboxGroup, Checkbox, Button, Input, Divider, Card } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Todo } from '../../interfaces/TodoList';
import { 
        getTodosService,
        addTodoService,
        removeTodoService,
        toggleTodoService 

      } from '../../services/TodoService';
import { Container } from "postcss";


export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    getTodosService()
      .then(initialTodos => {
        const todosWithCorrectCompleted = initialTodos.map(todo => ({
          ...todo,
          completed: Boolean(todo.completed),
        }));
        setTodos(todosWithCorrectCompleted);
      })
      .finally(() => setLoading(false)); // Update loading state when done
  }, []);

  
    
  // useEffect(() => {
  //   getTodosService().then(setTodos);
  // }, []);
    


  const handleAddTodo = () => {
    
    addTodoService(newTodo).then(() => getTodosService()).then(setTodos);
      setNewTodo('');
    
  };

  const handleRemoveTodo = (uniqueId:string) => {

    removeTodoService(uniqueId).then(() => getTodosService()).then(setTodos);
  };
  
  const handleToggleTodo = (completed: boolean , uniqueId:string) => {
    toggleTodoService(!completed , uniqueId).then(() => {
      getTodosService().then(setTodos);
    });
  };

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while fetching data
  }
   

  return (
    <div className="w-30 min-h-80% max-h-90%">
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
            {/* <Checkbox 
              value={index.toString()} 
              checked={true} 
              onChange={() => handleToggleTodo(todo.completed, todo.uniqueId)}
            >
              {todo.content}
            </Checkbox> */}
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleTodo(todo.completed, todo.uniqueId)}
            />
            {todo.content}


            <Button onClick={() => handleRemoveTodo(todo.uniqueId )}>Delete</Button>
          </div>
        ))}
      </CheckboxGroup>
    </div>
  );
}