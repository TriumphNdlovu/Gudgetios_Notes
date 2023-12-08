// 'use client';
import React, { useState } from 'react';
import { addNoteService } from '../services/NoteService';
import { Note } from '../interfaces/Notes';




// export default function AddNoteComponent() {


//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//       setIsModalOpen(true);
//     };
    
//     const closeModal = () => {
//       setIsModalOpen(false);
//     };



    
    

// return (
//     <div className='flex flex-col items-center space-y-4'>
//       <button onClick={openModal} className='border hover:border-cyan-600 padding border-spacing-2 w-full max-w-2xl min-w-[20rem] justify-center'>Add New Note</button>
//       {isModalOpen && (
//         <div className='fixed z-10 inset-0 overflow-y-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
//           <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
//             <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity' aria-hidden='true'></div>
//             <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
//             <div className='inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
//               <div className='bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
//                 <h3 className='text-lg leading-6 font-medium text-white' id='modal-title'>Add Note</h3>
//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-4'>
//                         <label htmlFor='title' className='block text-white text-sm font-bold mb-2'>Title:</label>
//                         <input type='text' id='title' name='title' value={title} onChange={e => setTitle(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' required />
//                     </div>
//                     <div className='mb-4'>
//                         <label htmlFor='content' className='block text-white text-sm font-bold mb-2'>Content:</label>
//                         <textarea id='content' name='content' value={content} onChange={e => setContent(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' required></textarea>
//                     </div>
              
//               <div className='bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
//                 <button  type='submit' className='mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>Add</button>
//                 <button onClick={closeModal} type='button' className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'>Cancel</button>
//               </div>
//               </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
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
