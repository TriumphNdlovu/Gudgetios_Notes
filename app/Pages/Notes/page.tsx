'use client';
// import MenuComponent from '@/app/components/MenuComponent';
import AddNoteComponent from '@/app/components/addNoteComponent';
import { Note } from '@/app/interfaces/Notes';
import {
  Card, CardBody,
  CardFooter, CardHeader,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Textarea,
  Spinner,
  Divider

} from '@nextui-org/react';
import { FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from 'react';
import { getNotesService, deleteNoteService, updateNoteService } from '@/app/services/NoteService';
import { useRouter } from 'next/navigation';
import { TfiClose } from "react-icons/tfi";
import { checkuser } from '@/app/components/checkuser';
import NoteCard from '@/app/components/NoteCard';

export default function Notes() {

  const [Notes, setNotes] = React.useState<Note[]>([]);
  const [updated, setUpdated] = React.useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const onCloseEdit = () => setIsOpenEdit(false);
  const onOpenEdit = (oldtitle: string, oldContent: string) => 
  {
    setIsOpenEdit(true)
    setTitle(oldtitle);
    setContent(oldContent);
  
  };
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [TuniqueId, setUniqueId] = useState('');

  const [loading, setLoading] = React.useState(true);
  const addNote = (note:any) => {
    setNotes(prevNotes => [...prevNotes, note]);
  };

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const onOpenDelete = ( uniqueId:any) =>
  {
    setIsOpenDelete(true)
    setUniqueId(uniqueId);
  }

  const router = useRouter();

  useEffect(() => {
    checkuser().then((logged) => {
      if (logged == false)
        router.push('../../Pages/login');
    });
    getNotesService().then((initialNotes) => {
      setNotes(initialNotes);
    }).then(() => {
      setLoading(false);
    });
  }, [AddNoteComponent, updated]);


  function handleDelete(uniqueId: string): void {
    deleteNoteService(TuniqueId)
    .then(() => {
      setNotes(Notes.filter((note) => note.uniqueId !== TuniqueId));
      onCloseDelete
    })
    .catch(error => {
      
      console.error("Error deleting note:", error);
    });
  }

  function handleEdit(uniqueId: string): void {
    // setNotes(Notes.filter((note) => note.uniqueId !== uniqueId));
    const id = 123;
    const updatedNote =
     {id,
      title, content, 
      created_at: (new Date()).toDateString(), 
      uniqueId};

      updateNoteService(updatedNote, uniqueId).then(() => {
        // Update the state with the edited note
        setNotes(prevNotes => {
          const updatedNotes = prevNotes.map(note => {
            if (note.uniqueId === uniqueId) {
              return { ...note, title, content };
            }
            return note;
          });
          return updatedNotes;
        });
    
        onCloseEdit();
      }).catch(error => {
        // Handle error
        console.error("Error updating note:", error);
      });
      
    // setUpdated
    // onCloseEdit();
  }

  function convertDate(Sdate: string): string {
    const date = new Date(Sdate);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    const formattedDate = `${date.toLocaleDateString(undefined, options)}`;
    return formattedDate;
    }

    if (loading) {

      return(

      <div className="h-screen w-screen flex items-center justify-center">

        <Spinner />
        Loading...

      </div>

      );

    }

  return (

    <div className=' w-full text-xl'>
      
      <div className='text-center text-2xl font-bold'>
        Notes
      </div>



      <div className='flex flex-col items-center space-y-4'>
        {
          Notes.map((note) => (
   <>
           
              <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
                <ModalContent>
                  <ModalHeader>Edit Note</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your title"
                      variant="bordered"
                    />
                    <Textarea
                      label="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter your content"
                      variant="bordered"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => { handleEdit(note.uniqueId) }}>
                      Save
                    </Button>
                    <Button variant="ghost" onClick={onCloseEdit}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
      
            
          
                <NoteCard note={note} handleDelete={handleDelete} 
                handleEdit={handleEdit} convertDate={convertDate} 
                onOpenEdit={onOpenEdit} onOpenDelete={() => onOpenDelete(note.uniqueId)} 
                isOpenDelete={isOpenDelete} onCloseDelete={onCloseDelete}
                />
           
          
      </> 
      ))
    }

    <div className='flex justify-end'>
        <AddNoteComponent addNote={addNote}/>
        {/* {Notes.map(note => <NoteComponent key={note.id} note={note} />)} */}
      </div>

      </div>
    </div>

  )
};


