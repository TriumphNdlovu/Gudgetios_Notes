
import { EVENT } from "../interfaces/Events";
import { getEvents,addEvent } from "../repository/EventCrud";

export const getEventsService = async (): Promise<EVENT[]> => {
    const data = await getEvents();
  
    let EVENTS: EVENT[] = [];
  
    data.forEach(element => 
      EVENTS.push({
        title: element.title,
        startdate: element.startdate,
        enddate: element.enddate,
        description: element.description,
        time: element.time,
        id: element.id,
        uniqueId: element.uniqueId,
        completed: element.completed,
      })
    );
  
    return EVENTS;
  }


export const addEventService = async (newEvent: EVENT): Promise<void> => {
  addEvent(newEvent.title, newEvent.startdate, newEvent.enddate, newEvent.description, newEvent.time);
};
