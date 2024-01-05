'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import React from 'react';
import { Todo } from '@/app/interfaces/TodoList';
import { getTodos } from '@/app/repository/TodoCrud';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, popover, useDisclosure, Input, Textarea } from '@nextui-org/react';
import { checkuser } from '@/app/components/checkuser';
import { useRouter } from 'next/navigation';
import { EVENT } from '@/app/interfaces/Events';
import { addEvent } from '@/app/repository/EventCrud';
import { addEventService, getEventsService } from '@/app/services/EventService';
import { get } from 'http';
import { title } from 'process';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Calendar: React.FC = () => {

  const [eventss, setEvents] = React.useState<Todo[]>([]);
  const [realevents, setEvent] = React.useState<EVENT[]>([]); // [1]
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [content, setContent] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [newEvent, setNewEvent] = React.useState<EVENT>();
  const [selectedEvent, setSelectedEvent] = React.useState<EVENT | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    checkuser().then((logged) => {
      if (logged == false)
        router.push('../../Pages/login');
    });
    const getEvents = async () => {

      getTodos().then((data) => {
        console.log(data);
        setEvents(data);

      })

      getEventsService().then((data) => {
        const mappedData = data.map((element) => ({
          title: element.title,
          startdate: element.startdate,
          enddate: element.enddate,
          description: element.description,
          time: element.time,
          id: element.id,
          uniqueId: element.uniqueId,
          completed: element.completed,
        }));
      
        setEvent(mappedData);
      }).then(() => {
        setLoading(false);
      });
    }

    getEvents();
  }, []);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setNewEvent(prevEvent => ({
      ...prevEvent!,
      [name]: value,
    }));
  };
  

  function onComplete(uniqueId: string) {
    realevents.forEach((event) => {
      if (event.uniqueId == uniqueId) {
        event.completed = true;
      }
    })
  }

  function handleEventClick(info: any) {
    console.log(info);
    const clickedEvent = realevents
    .find(
      (event) => event.title === info.event.title
    );
  
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      onOpen();
    }
  }
  

  const handleOpenEventModal = () => {
    setIsEventModalOpen(true);
  };
  
  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
  };

  function handleDateSelect(info:any) {
    
    setNewEvent({
      title: info.title,
      description: info.description,
      startdate: info.startStr,
      enddate: info.endStr,
      completed: false,
      id: info.id,
      uniqueId: info.uniqueId,
      time: info.time,
    });
    
    setIsEventModalOpen(true);
  };
  

  function handleAddEvent() {
    
    alert
    (
        newEvent!.title + " " + newEvent!.description + " " 
      + newEvent!.startdate + " " + newEvent!.enddate + " " 
      + newEvent!.time + " " + newEvent!.completed
    );

    addEventService(newEvent!);

  }

  return (
    <div className='w-4/5 flex flex-col justify-between '>
      {loading && <div><Spinner/>Filling Calendar...</div>}
      <FullCalendar
        contentHeight='auto'

        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        
        events={realevents.map(event => ({
          title: event.title,
          start: event.startdate,
          end: event.enddate,
          description: event.description,
          time: event.time,
          uniqueId: event.uniqueId,  
          id: event.id.toString(), // Convert the id to string
          completed: event.completed
        }))}
        

        eventDisplay='block'


        dayCellClassNames={
          'border-2 border-gray-200 rounded-md hover:border-gray-400 hover:bg-green-600'
        }
        eventClassNames={
          'border-2 border-yellow-200 rounded-md hover:border-yellow-400 hover:bg-yellow-600 truncate'
        }
        
        eventClick =
        {
          ((data) => handleEventClick(data))
        }

        
        select={
          handleDateSelect
        }

        selectable={true}
        editable={true}
        themeSystem='bootstrap5'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}


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
                <div className='p-2 r-50'>
                <FaTrash 
                className=' hover:text-red-500 cursor-pointer'
                />
                </div>
              <ModalHeader className="flex flex-col items-center p-2">
                

                <div className='flex flex-row items-centre'>
                 Event
                </div>
                </ModalHeader>
              <ModalBody className="p-4 text-white">
                <Input
                  name="title"
                  label="Title"
                  value={selectedEvent?.title}
                  onChange={handleInputChange}
                  className='py-1'
                  disabled
                />
                <Textarea
                  name="Description"
                  label="Description"
                  value={selectedEvent?.description}
                  onChange={handleInputChange}
                  className='py-1'
                  disabled
                />
                <Input
                  name="startdate"
                  label="Start Date"
                  value={(selectedEvent!.startdate).toString()}
                  onChange={handleInputChange}
                  className='py-1'
                  disabled
                />
                <Input
                  name="enddate"
                  label="End Date"
                  value={(selectedEvent!.enddate).toString()}
                  onChange={handleInputChange}
                  className='py-1'
                  disabled
                />
                <Input
                  name="time"
                  label="Time"
                  value={selectedEvent?.time}
                  onChange={handleInputChange}
                  className='py-1'
                  disabled
                />
              </ModalBody>
              <ModalFooter className="flex justify-end p-2">

                <Button className=" bg-blue-500 text-white px-4 py-2 " onPress={onClose}>
                  Edit
                  <FaEdit/>
                </Button>
                <Button className="bg-green-500 text-white px-4 py-2 " onPress={onClose} onClick={() => onComplete(selectedEvent!.uniqueId)}>
                  Complete
                </Button>
                <Button className=" bg-red-500 text-white px-4 py-2 " onPress={onClose}>
                  Close
                </Button>
                

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col">Your Event</ModalHeader>
            <ModalBody>
              <div>
              <Input
                    name="name"
                    label="Event title"
                    value={newEvent!.title}
                    onChange={handleInputChange}
                    className='py-1'
                  />
                  <Textarea
                    name="description"
                    label="Description"
                    value={newEvent!.description}
                    onChange={handleInputChange}
                    className='py-1'
                  />
                  <Input
                    name="startdate"
                    label="Start Date"
                    type='Date'
                    value={(newEvent!.startdate).toString()}
                    onChange={handleInputChange}
                    className='py-1'
                  />
                  <Input
                    name="enddate"
                    label="End Date"
                    type='Date'
                    value={(newEvent!.enddate).toString()}
                    onChange={handleInputChange}
                    className='py-1'
                  />
                  <Input
                    name="time"
                    label="Time"
                    type='Time'
                    value={newEvent!.time}
                    onChange={handleInputChange}
                    className='py-1'
                  />
                  <Button
                    color="success"
                    onPress={handleCloseEventModal}
                    onClick={handleAddEvent}
                  >
                    Add Event
                  </Button>
              </div>
              
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
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