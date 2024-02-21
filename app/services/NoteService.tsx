import  {addNote, getNotes, deleteNote, updateNote}  from "../repository/NoteCrud";
import { Note } from "../interfaces/Notes";

export const addNoteService = async (theNote: Note): Promise<void> => {

    addNote(theNote);
  
};

export const getNotesService = async (): Promise<Note[]> => {
    return await getNotes();
};

export const updateNoteService = async (theNote: Note, noteID: string): Promise<void> => 
{
    updateNote(theNote, noteID);
}


export const getUpdateService = async (): Promise<number> => {
    const data = await getNotes();
    let notesCount = data.length;
    return notesCount;
}
export const deleteNoteService = async (uniqueId: string): Promise<void> => {
    return await deleteNote(uniqueId);
}