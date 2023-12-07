import MenuComponent from '@/app/components/MenuComponent';
import { Note } from '@/app/interfaces/Notes';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import React from 'react';

export default function TodoList(){

  const Notes: Note[] = 
  [
    {id: 1,
    title: 'Note 1',
    content: 'Make beautiful websites regardless of your design experience',
    date: '2021-10-10',
    },
    {id: 2,
    title: 'Note 2',
    content: 'Make beautiful websites regardless of your design experienceMake beautiful websites regardless of your design experience',
    date: '2021-10-10',
    },
    {id: 3,
    title: 'Note 3',
    content: 'Make beautiful websites',
    date: '2021-10-10',
    },
  ]

  return (
    
    <div className='flex flex-col justify-between min-h-screen w-ful'>
      <MenuComponent/>
    <div className='text-center text-2xl font-bold'>Notes</div>
    <div className='flex flex-col items-center space-y-4'>
      {
        Notes.map((note) => (
          <Card className='border hover:border-cyan-600 padding border-spacing-2 w-full max-w-2xl min-w-[20rem] justify-center'>
            <CardBody>
              <CardHeader className='text-xl text-foreground-800'>{note.title}</CardHeader>
              <p className=' hover:translate-x-2'>{note.content}</p>
              <CardFooter className='text-end text-xs'>Created: {note.date}</CardFooter>
            </CardBody>
          </Card>
        ))
      }
    </div>
    <div className='flex flex-col items-center space-y-4'>
      <button className='border hover:border-cyan-600 padding border-spacing-2 w-full max-w-2xl min-w-[20rem] justify-center'>Add Note</button>
    </div>
    
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
