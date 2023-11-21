
'use client'
import { CheckboxGroup, Checkbox, Button, Input, Divider, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import React, { useState, useEffect, } from "react";
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
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(true);

  const columns = ["Status", "Content","Due", "Action"];

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

  const handleAddTodo = () => {
  
    addTodoService(newTodo,dueDate).then(() => {
      getTodosService().then(setTodos);
      setNewTodo('');
      setDueDate('');
    });
  };

  const handleRemoveTodo = (uniqueId:string) => {

    setLoading(true);
    removeTodoService(uniqueId).then(() => getTodosService()).then(setTodos)
    .finally(() => setLoading(false));

    if (loading) {
      return <p>Loading...</p>; 
    }
  };
  
  const handleToggleTodo = (completed: boolean , uniqueId:string) => {
    toggleTodoService(!completed , uniqueId).then(() => {
      getTodosService().then(setTodos);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
   

  return (
   <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter Todo here"
            style={{ marginRight: '10px' }} 
            />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button onClick={handleAddTodo}> + </Button>
        </div>

        <Divider />

        <Table>
          <TableHeader>

            <TableColumn key={0}>{columns[0]}</TableColumn>
            <TableColumn key={1}>{columns[1]}</TableColumn>
            <TableColumn key={2}>{columns[2]}</TableColumn>
            <TableColumn key={2}>{columns[3]}</TableColumn>

          </TableHeader>

          <TableBody>
            {todos.map((row) => (
              <TableRow key={row.uniqueId}
              >
                <TableCell key={0}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                {<input
                  type="checkbox"
                  checked={row.completed}
                  onChange={() => handleToggleTodo(row.completed, row.uniqueId)} />}</TableCell>
                <TableCell key={1}>{row.content}</TableCell>
                <TableCell key={2}>{(row.due).toString()}</TableCell>
                <TableCell key={3}>{<Button onClick={() => handleRemoveTodo(row.uniqueId)}>Delete</Button>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
  );
}