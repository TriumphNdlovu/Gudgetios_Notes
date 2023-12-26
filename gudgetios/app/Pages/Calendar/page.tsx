'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import React from 'react';
import { Todo } from '@/app/interfaces/TodoList';
import { getTodos } from '@/app/repository/TodoCrud';
import { modal, popover } from '@nextui-org/react';

const Calendar: React.FC = () => {

  const [events, setEvents] = React.useState<Todo[]>([]);

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

  const handleEventClick = (clickInfo:any) => {
    alert(`You clicked on event: ${clickInfo.event.title}`);
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
        eventClick={handleEventClick} // Add this line
      />
    </div>
  );
};




export default Calendar;