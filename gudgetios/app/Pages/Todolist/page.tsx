'use client';
import {
  CheckboxGroup,
  Checkbox,
  Button,
  Input,
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Todo } from "../../interfaces/TodoList";
import {
  getTodosService,
  addTodoService,
  removeTodoService,
  toggleTodoService,
  editTodoService,
} from "../../services/TodoService";
import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Active");
  const [editTodo, setEditTodo] = useState('');
  const [editDate, setEditDate] = useState('');
  const columns = ["Status", "Content", "Due", "Action"];
  const filtertitle = ["Active", "Completed", "Overdue"];

  useEffect(() => {
    getTodosService()
      .then((initialTodos) => {
        const todosWithCorrectCompleted = initialTodos.map((todo) => ({
          ...todo,
          completed: Boolean(todo.completed),
        }));
        setTodos(todosWithCorrectCompleted);
      })
      .finally(() => setLoading(false)); // Update loading state when done
  }, []);

  const handleAddTodo = () => {
    addTodoService(newTodo, dueDate).then(() => {
      getTodosService().then(setTodos);
      setNewTodo("");
      setDueDate("");
    });
  };


  

  const handleRemoveTodo = (uniqueId: string) => {
    setLoading(true);
    removeTodoService(uniqueId)
      .then(() => getTodosService())
      .then(setTodos)
      .finally(() => setLoading(false));

    if (loading) {
      return <p className="w-full justify-centre">Loading...</p>;
    }
  };

  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const handleToggleTodo = (completed: boolean, uniqueId: string) => {
    toggleTodoService(!completed, uniqueId).then(() => {
      getTodosService().then(setTodos);
    });
  };

  const handleEditTodo = (id: string) => {
    
    editTodoService(editTodo, editDate, id).then(() => {
      getTodosService().then(setTodos);
    });
  
    setEditTodo('');
    setEditDate('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  
  return (
    <div className="flex flex-col items-center justify-center px-4 ">
      <div className="w-full max-w-full">

      <div className="flex">
      <Textarea
          label="Add Todo"
          variant="bordered"
          placeholder="enter todo here..."
          disableAnimation
          disableAutosize
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="mb-2 w-full mr-2"
          classNames={{
            input: "resize-y min-h-[40px]",
          }}
        />
        <div>
          <p>Choose due Date</p>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mb-2 w-full min-h-fit-content"
          />
        </div>
        
      </div>

      <div className="flex">
          <Button onClick={handleAddTodo} className="mb-2 flex-auto">
            <FaPlus />
          </Button>
      </div>

        

        <Divider className="mb-2" />
      <div className="w-full h-full">
        <Table className="h-full w-full">
          <TableHeader>
            {columns.map((column, index) => (
              <TableColumn key={index} className={`w-${index === 1 ? 3 : 1}/6`}>
                <div>
                  {column}
                  {index === 1 && 
                      <Select
                      items={filtertitle}
                      label="Filter"
                      key= "Active"
                      placeholder="Filter Tasks"
                      style={{ width: "40%", marginLeft: "30%"}}
                      onChange={(event) => setFilter(event.target.value)}
                      >
                      {filtertitle.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </Select>
                  }
                </div>
                
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            {todos
              .filter((todo) => {
                if (filter === "Active") return !todo.completed;
                if (filter === "Completed") return todo.completed;
                if (filter === "Overdue")
                  return isOverdue(todo.due.toString()) && !todo.completed;
                return true;
              })
              .map((row) => (
                <TableRow
                  key={row.uniqueId}
                  style={{
                    backgroundColor: row.completed ? "#427b3f" : "transparent",
                  }}
                >
                  <TableCell
                    key={0}
                    className="flex justify-center items-center rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={row.completed}
                      onChange={() => handleToggleTodo(row.completed, row.uniqueId)}
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </TableCell>
                  <TableCell
                    key={1}
                    style={{
                      backgroundColor: row.completed
                        ? "transparent"
                        : "#0D1317",
                      borderRadius: "10px",
                    }}
                  >
                    {row.content}
                  </TableCell>
                  <TableCell key={2}>{row.due.toString()}</TableCell>
                  <TableCell key={3}>
                    <Button onClick={() => handleRemoveTodo(row.uniqueId)}>
                      <FaTrash />
                    </Button>
                    <Popover placement="bottom" showArrow offset={10}>
                    <PopoverTrigger>
                        <Button 
                          color="primary" 
                          onClick={() => {
                            setEditTodo(row.content);
                            setEditDate(row.due.toString());
                          }}
                        >
                          <FaEdit />
                        </Button>
                      </PopoverTrigger>
                    <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                      <div className="px-1 py-2 w-full">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                          Edit Todo
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                          <Input
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            placeholder="Enter new todo here"
                          />
                          <Input
                            type="date"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                          />
                          <Button onClick={() => handleEditTodo(row.uniqueId)}>Save</Button>
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                  </Popover>
  
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
