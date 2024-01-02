'use client'
import { Button, Card, CardHeader } from "@nextui-org/react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useState } from 'react';
import { FaCheck, FaTrash } from "react-icons/fa";

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
          className=" bg-transparent border border-cyan-600 h-10 w-full justify-start pl-5">
            {content}
          </Card>  
        <div>
          <Button>
          {
            completed ?
            (
              <FaTrash/>
            ) :
            (
              <FaCheck/>
            )
          }
            
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 'task-1', content: 'Task 1', Completed: false },
    { id: 'task-2', content: 'Task 2', Completed: false },
    { id: 'task-3', content: 'Task 3', Completed: true },
    { id: 'task-4', content: 'Trinity', Completed: false },
    { id: 'task-5', content: 'Trevor', Completed: true },
  ]);


  const moveCard = (fromIndex: any, toIndex: any) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className=" flex flex-col items-center">
      <h1 className='text-2xl font-bold'>TodoList</h1>
      <div>
        <Button>Add Task</Button>
      </div>
      <div>
        <div className="flex flex-row items-center h-[80vh]">
          <div className="px-1">
            <Card className="flex-grow min-w-[60vw] min-h-[60vh]">
              <CardHeader>
                Tasks
              </CardHeader>
              <div>
                <DndProvider backend={HTML5Backend}>
                  {tasks.map((task, index) => (
                    
                      <CardItem
                        key={task.id}
                        id={task.id}
                        content={task.content}
                        completed={task.Completed}
                        index={index}
                        moveCard={moveCard}
                      />
                  
                  ))}
                </DndProvider>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
