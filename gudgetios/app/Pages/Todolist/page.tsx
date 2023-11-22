
'use client'
import { CheckboxGroup, Checkbox, Button, Input, Divider,
   Card, Table, TableBody, TableCell, TableColumn, 
   TableHeader, TableRow, getKeyValue, Tabs,Tab, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState, useEffect, } from "react";
import { Todo } from '../../interfaces/TodoList';
import { 
        getTodosService,
        addTodoService,
        removeTodoService,
        toggleTodoService 

      } from '../../services/TodoService';
import { 
  FaEdit, FaTrash, FaPlus,FaCheck 

} from 'react-icons/fa';


export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Active');
  const columns = ["Status", "Content","Due", "Action"];
  const filtertitle = ["Active", "Completed", "Overdue"];


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

  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
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
    <div className="flex flex-col items-center justify-center px-4 sm:px-0">
      <div className="w-full max-w-full">
        <Textarea
          label="Add Todo"
          variant="bordered"
          placeholder="enter todo here..."
          disableAnimation
          disableAutosize
          onChange={(e) => setNewTodo(e.target.value)}
          className="mb-2 w-full"
          classNames={{
            input: "resize-y min-h-[40px]",
          }}
        />
        
        <div>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mb-2 w-full"
          />

          <Divider orientation="vertical" />

          <Button onClick={handleAddTodo} className="mb-2 w-full">
            <FaCheck />
          </Button>

        </div>
        
  
        <Select
          items={filtertitle}
          label="Filter"
          placeholder="Filter Tasks"
          className="mb-2 w-full"
          onChange={(event) => setFilter(event.target.value)}
        >
          {filtertitle.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}

        </Select>

        <Divider className="mb-2" />

        <Table className="mb-2 w-full">
          <TableHeader>
            <TableColumn key={0} className="w-1/6">{columns[0]}</TableColumn>
            <TableColumn key={1} className="w-3/6">{columns[1]}</TableColumn>
            <TableColumn key={2} className="w-1/6">{columns[2]}</TableColumn>
            <TableColumn key={3} className="w-1/6">{columns[3]}</TableColumn>
          </TableHeader>

                        <TableBody>
                          {todos
                          .filter(todo => {
                            if (filter === 'Active') return !todo.completed;
                            if (filter === 'Completed') return todo.completed;
                            if (filter === 'Overdue') return (isOverdue(todo.due.toString()) && !todo.completed);
                            return true;
                          })
                          .map((row) => (
                            <TableRow key={row.uniqueId}
                            style=
                            {{ 
                              backgroundColor: row.completed ? '#427b3f' : 'transparent',
                            }}
                            >
                              <TableCell key={0}
                                className="flex justify-center items-center rounded-lg"
                              >
                              {
                                <input
                                type="checkbox"
                                checked={row.completed}
                                onChange={() => handleToggleTodo(row.completed, row.uniqueId)} 
                                className="w-4 h-4 sm:w-6 sm:h-6"
                              />
                              }
                                
                                </TableCell>
                              <TableCell key={1}
                                style={{
                                  backgroundColor: row.completed ? '#transparent' : '#0D1317',
                                  borderRadius: '10px',
                                }}>
                                {row.content}
                              {row.content}</TableCell>
                              <TableCell key={2}>{(row.due).toString()}</TableCell>
                              <TableCell key={3}>
                                {
                                  <Button onClick={() => handleRemoveTodo(row.uniqueId)}>
                                    <FaTrash/>
                                  </Button>
                                }
                                {
                                  <Button>
                                    <FaEdit/>                              
                                  </Button>
                                }
                              </TableCell>
                            </TableRow>
                          ))}
          </TableBody>
        </Table>           
        </div>
      </div>
  );
}