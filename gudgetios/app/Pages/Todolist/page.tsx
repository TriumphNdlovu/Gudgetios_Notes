'use client'
import { Card } from "@nextui-org/react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useState } from 'react';

const ItemTypes = {
  CARD: 'card',
};

const CardItem = ({ id, content, index, moveCard }: { id: string, content: string, index: number, moveCard: (fromIndex: number, toIndex: number) => void }) => {
  const [, ref] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem:any) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <Card>
        {content}
      </Card>
    </div>
  );
};

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
  ]);

  const moveCard = (fromIndex:any, toIndex:any) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className=" flex flex-col items-center">
        <h1 className='text-2xl font-bold'>TodoList</h1>

        <div>
          <p>Add Button here</p>
        </div>

        <div>
          <div className="flex flex-row items-center h-[80vh]">
            <div className="px-1">
              <Card className="items-center flex-grow min-w-[60vw] min-h-[60vh]">
                
                <DndProvider backend={HTML5Backend}>
                  {tasks.map((task, index) => (
                    <CardItem key={task.id} 
                    id={task.id} content={task.content} 
                    index={index} moveCard={moveCard} />
                  ))}
                </DndProvider>

              </Card>
            </div>
        </div>
      </div>

      
    </div>
  );
}




{/* <div className=" flex flex-col items-center">
        <h1 className='text-2xl font-bold'>TodoList</h1>

        <div>
          <p>Add Button here</p>
        </div>
        <div>
          <div className="flex flex-row items-center h-[80vh]">

            <div className="px-1">
              <Card className="items-center flex-grow min-w-[20vw] min-h-[60vh]">
                <p>Backlog</p>
              </Card>
            </div>

              

            <div className="px-1">
              <Card className="items-center flex-grow min-w-[20vw] min-h-[60vh]">
                <p>Inprogress</p>
              </Card>
            </div>

              
            <div className="px-1">
              <Card className="items-center flex-grow min-w-[20vw] min-h-[60vh]">
                <p className="items-center">Completed</p>
              </Card>
            </div>

          </div>
        </div>
      </div> */}