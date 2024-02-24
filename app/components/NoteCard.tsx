import { Button, Card, CardBody, CardFooter, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

export default function NoteCard({note, onOpenDelete, onOpenEdit, 
  convertDate,handleDelete,handleEdit ,isOpenDelete, onCloseDelete}:
   {note: any, onOpenDelete: any, onOpenEdit: any, convertDate: any 
    , handleDelete: any, handleEdit: any ,isOpenDelete: any, onCloseDelete: any}) {

  return (
        <div>
          <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
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

              <Card  className='border hover:border-cyan-600 border-spacing-2 w-3/5 min-w-[20rem] justify-center relative'>
            <CardBody>
            
              <button onClick={onOpenDelete} className='text-white hover:text-red-800  absolute flex flex-col top-3 right-2 py-2'>
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
                  updated_at:
                  {
                    note.created_at === 'just now' ? 'just now' : convertDate(note.created_at)
                  } 

                  <button onClick={() => onOpenEdit(note.title, note.content)} className='text-white hover:text-blue-500 padding px-1'>
                    <FiEdit />
                  </button>
                </CardFooter>
                </CardBody>
          </Card>
        </div>

    )
}