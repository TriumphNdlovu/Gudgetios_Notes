'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import React from 'react';
import { Todo } from '@/app/interfaces/TodoList';
import { getTodos } from '@/app/repository/TodoCrud';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, modal, popover, useDisclosure } from '@nextui-org/react';

const Calendar: React.FC = () => {

  const [events, setEvents] = React.useState<Todo[]>([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [content, setContent] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const getEvents = async () => {
      
      getTodos().then((data) => {
        console.log(data);
        setEvents(data);
      }).then(() => {
        setLoading(false);
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
  function onComplete() {
    console.log("it's completed");
  }

  function handleEventClick(info:any) {
    setContent(info);
    onOpen();
  }

  return (
    <div className='w-4/5 flex flex-col justify-between '>
      {loading && <div><Spinner/>Filling Calendar...</div>}
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
              <ModalHeader className="flex flex-col">Your Task</ModalHeader>
              <ModalBody>
                <p>
                  {content}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={onClose} onClick={()=>{onComplete()}}>
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