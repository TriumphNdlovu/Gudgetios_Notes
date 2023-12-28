'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import React from 'react';
import { Todo } from '@/app/interfaces/TodoList';
import { getTodos } from '@/app/repository/TodoCrud';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, modal, popover, useDisclosure } from '@nextui-org/react';

const Calendar: React.FC = () => {

  const [eventss, setEvents] = React.useState<Todo[]>([]);
  const [events, setEventss] = React.useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [content, setContent] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [addedevent, OnAddevent] = React.useState(false);


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

  function handleDateSelect(info:any) {
    const title = prompt('Please enter a new title for your event');
    const newEvent = {
      title,
      start: info.startStr,
      end: info.endStr,
      allDay: info.allDay
    };
  
    setEventss([...events, 
                // Remove the unnecessary newEvent variable declaration
                // newEvent,

              ]);
  }
   

  function handleEventAdd(info:any) {
    alert("Start " + info.start + " End " + info.end);
  }

  return (
    <div className='w-4/5 flex flex-col justify-between '>
      {loading && <div><Spinner/>Filling Calendar...</div>}
      <FullCalendar
        contentHeight='auto'

        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        
        events={
          eventss.filter(event => !event.completed).map(event => {
            return {
              title: event.content,
              start: event.due,
              end: event.due,
            }
          })
        }

        eventDisplay='block'

        eventContent={renderEventContent}
        eventClick={((data) => handleEventClick(data.event.title))}
        select={handleDateSelect}
        selectable={true}
        editable={true}
        themeSystem='bootstrap5'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}

        eventAdd={
          ((data) => {
            eventss.push({
              content: data.event.title,
              start: data.event.start!,
              end: data.event.end!,
              completed: false,
              uniqueId: '',
              due: data.event.end!,
            });
          })
        }

        eventRemove={
          ((data) => {
            eventss.forEach((event) => {
              if (event.content == data.event.title) {
                eventss.splice(eventss.indexOf(event), 1);
              }
            })
          })
        }

        eventChange={
          ((data) => {
            eventss.forEach((event) => {
              if (event.content == data.event.title) {
                event.start = data.event.start!;
                event.end = data.event.end!;
              }
            })
          })
        }



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