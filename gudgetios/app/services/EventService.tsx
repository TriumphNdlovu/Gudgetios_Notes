
import { EVENT } from "../interfaces/Events";
import { getEvents,addEvent } from "../repository/EventCrud";

export const getEventsService = async (): Promise<EVENT[]> => {
    const data = await getEvents();
  
    let EVENTS: EVENT[] = [];
  
    data.forEach(element => 
      EVENTS.push({
        name: element.name,
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
  addEvent(newEvent.name, newEvent.startdate, newEvent.enddate, newEvent.description, newEvent.time);
};
