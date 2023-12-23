import Link from 'next/link';
import MenuComponent from './components/MenuComponent';
import TodoList from './Pages/Todolist/page';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
// import Header from './components/Header';

export default function Index() {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full ">
      <div className="flex flex-col w-full p-unit-xl">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>Todo List</CardHeader>
              <Link href="/page1" className='px-5 py-5 border-r-5'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className="card">
                    <img src="https://picsum.photos/200" className='rounded border-r-10' alt="Image 1" />
                  </div>
                  <div>
                    Summary:
                    <text className='text-2xl'>Active: 15</text>
                    <text className='text-2xl'>Completed: 5</text>
                    <text className='text-2xl'>Overdue: 7</text>
                    <text className='text-2xl'>Total: 20</text>
                  </div>
                </div>
              
            </Link>
          </Card>

          <Card>
            <CardHeader>Todo List</CardHeader>
              <Link href="/page1" className='px-5 border-r-5'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className="card">
                    <img src="https://picsum.photos/200" className='rounded border-r-10' alt="Image 1" />
                  </div>
                  <div>
                    Summary:
                  </div>
                </div>
              
            </Link>
          </Card>

          <Card>
            <CardHeader>Todo List</CardHeader>
              <Link href="/page1" className='px-5 border-r-5'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className="card">
                    <img src="https://picsum.photos/200" className='rounded border-r-10' alt="Image 1" />
                  </div>
                  <div>
                    Summary:
                  </div>
                </div>
              
            </Link>
          </Card>

          <Card>
            <CardHeader>Todo List</CardHeader>
              <Link href="/page1" className='px-5 border-r-5'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className="card">
                    <img src="https://picsum.photos/200" className='rounded border-r-10' alt="Image 1" />
                  </div>
                  <div>
                    Summary:
                  </div>
                </div>
              
            </Link>
          </Card>
        </div>
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
  );
}
