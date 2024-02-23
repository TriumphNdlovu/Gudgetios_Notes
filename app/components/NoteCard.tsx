import { CardFooter, Divider } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

export default function NoteCard({note, onOpen, onOpenEdit, convertDate,handleDelete,handleEdit}: {note: any, onOpen: any, onOpenEdit: any, convertDate: any , handleDelete: any, handleEdit: any}) {
    return (
        <div>
            
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
                  updated_at:
                  {
                    note.created_at === 'just now' ? 'just now' : convertDate(note.created_at)
                  } 

                  <button onClick={() => onOpenEdit(note.title, note.content)} className='text-white hover:text-blue-500 padding px-1'>
                    <FiEdit />
                  </button>
                </CardFooter>
        </div>

    )
}