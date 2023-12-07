import  {addNote, getNotes}  from "../repository/NoteCrud";
import { Note } from "../interfaces/Notes";

export const addNoteService = async (theNote: Note): Promise<void> => {

    addNote(theNote);
  
};

export const getNotesService = async (): Promise<Note[]> => {
    return await getNotes();
};