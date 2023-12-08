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
  button

} from '@nextui-org/react';
import { FiEdit } from "react-icons/fi";
import React, { useEffect } from 'react';
import { getNotesService,deleteNoteService } from '@/app/services/NoteService';
import { MdDeleteForever } from "react-icons/md";
export default function Notes(){
  const [Notes, setNotes] = React.useState<Note[]>([]);
  const [updated, setUpdated] = React.useState<boolean>(false);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  useEffect(() => {
   getNotesService().then((initialNotes) => {
    setNotes(initialNotes);
   })
  }, [AddNoteComponent,updated]);


  function handleDelete(uniqueId: string): void {
    // setNotes(Notes.filter((note) => note.uniqueId !== uniqueId));
    deleteNoteService(uniqueId);
    setUpdated
    onOpenChange();
  }

  return (
    
    <div className='flex flex-col justify-between min-h-screen w-ful'>
      {/* <MenuComponent/> */}
    <div className='text-center text-2xl font-bold'>Notes</div>
    <div className='flex flex-col items-center space-y-4'>
      {
        Notes.map((note) => (
          <Card key={note.uniqueId} className='border hover:border-cyan-600 border-spacing-2 w-full max-w-2xl min-w-[20rem] justify-center relative'>
              <button onClick={()=>{}} className='text-white hover:text-blue-500 flex flex-col top-2 right-2'>
              <FiEdit />
              </button>
              <button onClick={onOpen} className='text-white hover:text-red-800  flex flex-col top-2 right-2'>
              <MdDeleteForever />
              </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Note</ModalHeader>
              <ModalBody>
                <p> 
                  Are you sure you want to delete this note?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={()=>{handleDelete(note.uniqueId)}}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            
            
            
            
            <CardBody>
              <div className='flex justify-between items-center'>
                <CardHeader className='text-xl text-foreground-800'>{note.title}</CardHeader>
              </div>
              <p className=' hover:translate-x-2'>{note.content}</p>
              <CardFooter className='text-end text-xs'>Created: {(note.created_at)}</CardFooter>
            </CardBody>
          </Card>
        ))
      }
    </div>
   

   <div>

   </div>

    <AddNoteComponent

    />
    
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
    <p>
      Powered by{' '}
      <a
        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
        target="_blank"
        className="font-bold hover:underline"
        rel="noreferrer"
      >
        Gudgetios
      </a>
    </p>
  </footer>
  </div>
  )
};


