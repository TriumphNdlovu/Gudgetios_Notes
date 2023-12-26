'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import React from 'react';
import { Todo } from '@/app/interfaces/TodoList';
import { getTodos } from '@/app/repository/TodoCrud';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, modal, popover, useDisclosure } from '@nextui-org/react';

const Calendar: React.FC = () => {

  const [events, setEvents] = React.useState<Todo[]>([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [content, setContent] = React.useState<string>("");
  React.useEffect(() => {
    const getEvents = async () => {
      
      getTodos().then((data) => {
        console.log(data);
        setEvents(data);
      });
    }
    getEvents();
  }, []);

  function renderEventContent(eventInfo:any) {
    let title = eventInfo.event.title;
    if (title.length > 20) {
      title = title.substring(0, 20) + '...';
    }

    return (
      <div>
        <b>{title}</b>
      </div>
      
    );
  }

  onclose = () => {
    console.log("it's closed");
  }

  function handleEventClick(info:any) {
    setContent(info);
    onOpen();
  }

  return (
    <div className='w-4/5 h-full'>
      <FullCalendar
        contentHeight='auto'
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        
        events={
          events.filter(event => !event.completed).map(event => {
            return {
              title: event.content,
              date: event.due,
            }
          })
        }
        eventContent={renderEventContent}
        eventClick={((data) => handleEventClick(data.event.title))} 
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <b> 
                  Your Event
                </b>
                <p>
                  {content}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={onClose}>
                  Complete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </div>
  );
};




export default Calendar;