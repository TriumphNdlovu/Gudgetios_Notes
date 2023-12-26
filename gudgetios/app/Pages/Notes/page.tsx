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
import { getNotesService, deleteNoteService } from '@/app/services/NoteService';

import { TfiClose } from "react-icons/tfi";

export default function Notes() {

  const [Notes, setNotes] = React.useState<Note[]>([]);
  const [updated, setUpdated] = React.useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const onCloseEdit = () => setIsOpenEdit(false);
  const onOpenEdit = () => setIsOpenEdit(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = React.useState(true);


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    getNotesService().then((initialNotes) => {
      setNotes(initialNotes);
    }).then(() => {
      setLoading(false);
    });
  }, [AddNoteComponent, updated]);


  function handleDelete(uniqueId: string): void {
    // setNotes(Notes.filter((note) => note.uniqueId !== uniqueId));
    deleteNoteService(uniqueId);
    setUpdated
    onOpenChange();
  }

  function handleEdit(uniqueId: string): void {
    throw new Error('Function not implemented.');
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

            <Card key={note.uniqueId} className='border hover:border-cyan-600 border-spacing-2 w-3/5 min-w-[20rem] justify-center relative'>

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
                        <Button color="danger" onPress={() => { handleDelete(note.uniqueId) }}>
                          Delete
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
                <ModalContent>
                  <ModalHeader>Edit Note</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Title"
                      value={note.title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your title"
                      variant="bordered"
                    />
                    <Textarea
                      label="Content"
                      value={note.content}
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


              <CardBody>
              
                <button onClick={onOpen} className='text-white hover:text-red-800  absolute flex flex-col top-3 right-2 py-2'>
                  <TfiClose />
                </button>
                <div className='text-xl text-foreground-800 py-2'>
                  {note.title}
                </div>
                <div className='pb-5'>
                  <Divider />
                </div>
                <p className=' font-thin'>{note.content}</p>
                <CardFooter className='flex justify-end text-end text-xs text-gray-400' >
                  Created: {convertDate(note.created_at)}
                  <button onClick={onOpenEdit} className='text-white hover:text-blue-500 padding px-1'>
                    <FiEdit />
                  </button>
                </CardFooter>
              </CardBody>
            </Card>
          ))
        }
      </div>
      <div>
      </div>

      <div className='flex justify-end'>
        <AddNoteComponent />
      </div>
    </div>
  )
};


