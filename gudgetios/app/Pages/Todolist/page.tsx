'use client'
import { Button, Card, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Spinner, Textarea, } from "@nextui-org/react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { use, useEffect, useState } from 'react';
import { FaAlignJustify, FaCheck, FaCross, FaEraser, FaPlusCircle, FaTimes, FaTrash, FaXRay } from "react-icons/fa";
import { getTodos } from "@/app/repository/TodoCrud";
import { Todo } from "@/app/interfaces/TodoList";
import { removeTodoService, toggleTodoService } from "@/app/services/TodoService";

const ItemTypes = {
  CARD: 'card',
};

const CardItem = ({ id, content, completed, index, moveCard }: { id: string, content: string, completed: boolean, index: number, moveCard: (fromIndex: number, toIndex: number) => void }) => {
  const [, ref] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <div className="flex flex-row pt-1">
          <Card style={
            completed ?
            {
               textDecoration: 'line-through',
               backgroundColor: 'green'
            }:
            {
              
            }
            
          }
          className=" bg-transparent border hover:border-cyan-600 h-10 w-full justify-start pl-5 text-ellipsis"
          >
            <div className=" text-ellipsis">
              {content}
            </div>

          </Card>  
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = () => {
  // Add your task adding logic here
  setIsModalOpen(false);
};

  const moveCard = (fromIndex: any, toIndex: any) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const updatedTasks = async () => {
    getTodos().then((data) => {
      setTasks(data);
    });
    
  }

  const handleComplete = async (id: string, completed: boolean) => {
    await toggleTodoService(!completed, id);
    updatedTasks();
  };

  const handleDelete = async (id: string) => {
    await removeTodoService(id);
    updatedTasks();
  };

  const getCompletedTasks = () => {
    let completedTasks = 0;
    tasks.forEach((task) => {
      if (task.completed) {
        completedTasks++;
      }
    });
    return completedTasks;
  }

  useEffect(() => {
    updatedTasks().then(() => {
      setLoading(false);
    }
    );
  }

  , []);
  
  return (
    <div className=" flex flex-col items-center">
      <h1 className='text-2xl font-bold'>TodoList</h1>
      <div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" 
          onClick={handleOpenModal}
          >
          <FaPlusCircle className="mr-2" />
          Add Task
        </Button>
        <div style={{ zIndex: 9999 }}>
          <Modal backdrop="blur" isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalContent>
            {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Please Add your Task</ModalHeader>
              <ModalBody>
                <Textarea
                  isRequired
                  label="Task Description"
                  labelPlacement="outside"
                  placeholder="Enter your task"
                  className="max-w-full"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
            
            </ModalContent>
          </Modal>
        </div>
        
      </div>
      <div>
        <div className="flex flex-row items-center h-[80vh] w-[75vw] ">
          <div className="px-1">
            <Card className=" flex-grow min-h-[60vh] min-w-[75vw]">
              <CardHeader>
                    {getCompletedTasks()} / {tasks.length}  Completed :
                      <Progress value={(getCompletedTasks()/tasks.length) * 100}
                        className="mr-2"
                        color={
                          (getCompletedTasks()/tasks.length) * 100 === 100 ?
                          'success' :
                          'primary'
                        }
                      />
              </CardHeader>
              {!loading ? (
                <div className=" overflow-auto scroll-smooth ">
                <DndProvider backend={HTML5Backend}>
                  {tasks.map((task, index) => (
                    <div className="flex flex-row pt-1">
                      <div className="flex-grow text-ellipsis">
                        <CardItem
                          key={(task.id).toString()}
                          id={task.uniqueId}
                          content={task.content}
                          completed={task.completed}
                          index={index}
                          moveCard={moveCard}
                        />
                      </div>

                      <Button
                        
                          >
                          {
                            task.completed ?
                            (
                              <FaTimes onClick={() => {
                                handleComplete(task.uniqueId, task.completed);
                              }}
                              className="hover:text-yellow-500"/>
                            ) :
                            (
                              <FaCheck onClick={() => {
                                handleComplete(task.uniqueId, task.completed);
                              }}
                              className="hover:text-green-600"/>
                            )
                            
                          }
                            <FaTrash onClick={() => {
                              handleDelete(task.uniqueId);
                            }}
                            className="hover:text-red-600"/>
                      </Button>

                    </div>
                  ))}
                </DndProvider>
              </div>
              ):
              (
                <div className=" flex items-center justify-center">

                  <Spinner />
                  Tasks Loading...

                </div>
              )
              }
              
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
