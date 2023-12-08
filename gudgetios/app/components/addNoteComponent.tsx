// 'use client';
import React, { useState } from 'react';
import { addNoteService } from '../services/NoteService';
import { Note } from '../interfaces/Notes';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { FaTruckMonster } from 'react-icons/fa';

export default function AddNoteComponent() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 
  function handleSubmit() {

    const note: Note = {
      id : 0,
      title,
      content,
      uniqueId : '',
      created_at: '',
    };

    addNoteService(note);

    setTitle('');
    setContent('');

    onOpenChange();
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add new Note</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your title"
                  variant="bordered"
                />
                <Textarea
                  label="Content"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your content"
                  variant="bordered"
                />
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{handleSubmit()}}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
