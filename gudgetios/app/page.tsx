'use client'
import Link from 'next/link';
import MenuComponent from './components/MenuComponent';
import TodoList from './Pages/Todolist/page';
import { Card, CardBody,Spinner, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';
import { getUpdatesService } from './services/TodoService';
import { getNotes } from './repository/NoteCrud';
import { getNotesService, getUpdateService } from './services/NoteService';
import { FaCalendarMinus, FaCheck, FaCircle, FaClock, FaCross } from 'react-icons/fa';
// import Header from './components/Header';

export default function Index() {

  const [Active, setActive] = React.useState<number>(0);
  const [Completed, setCompleted] = React.useState<number>(0);
  const [Overdue, setOverdue] = React.useState<number>(0);
  const [Total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [notesCount, setNotesCount] = React.useState(0);

  React.useEffect(() => {
    getUpdatesService().then((data) => {
      setActive(data.Active);
      setCompleted(data.Completed);
      setOverdue(data.Overdue);
      setTotal(data.Total);

    }).then(() => {

      getUpdateService().then((data) => {
        setNotesCount(data);
      }).finally(() => {
        setLoading(false);
      });

    })
  }, []);

  
    if(loading) {

      <div className="h-screen w-screen flex items-center justify-center">
        
        <Spinner/> Loading...
        
      </div>

    }

  return (
    <div className="flex flex-col justify-between min-h-screen w-full ">
      <div className="flex flex-col w-full p-unit-xl">
        <div className="grid grid-cols-2 gap-4">
          <Card  className=' border hover:border-blue-500'>
            <CardHeader className='text-2xl'>Todo List</CardHeader>
              <Link href="/page1" className='px-5 py-5 border-r-5'>
                <div className='grid grid-cols-2 gap-2'>
                    <div className="card">
                      <img src="https://picsum.photos/200" className='rounded border-r-10' alt="Image 1" />
                    </div>
                    <div>
                    <text className='text-2xl flex flex-col justify-centre'>Summary</text>
                    <Divider />
                    {loading ? (
                        
                          <React.Fragment>
                            <Spinner/> Loading...
                          </React.Fragment>
                    
                    ) : (
                        <div>
                          <div className='flex flex-row pt-2'>
                            <FaCircle className=' text-green-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Active : {Active}</div>
                              </text>
                          </div>
                          <div className='flex flex-row pt-2'>
                            <FaCheck className=' text-blue-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Completed : {Completed}</div>
                              </text>
                          </div>
                          <div className='flex flex-row pt-2'>
                            <FaCalendarMinus className=' text-red-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Overdue : {Overdue}</div>
                              </text>
                          </div>
                          <div className='flex flex-row pt-2'>
                            <FaClock className=' text-blue-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Total : {Total}</div>
                              </text>
                          </div>
                        </div>
                      )
                    }
                    
                  </div> 
                </div> 
              
            </Link>
          </Card>

          <Card className='border hover:border-blue-500'>
            <CardHeader className='text-2xl'>Notes</CardHeader>
              <Link href="/page1" className='px-5 py-5 border-r-5'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className="card">
                    <img src="https://picsum.photos/200" className='rounded border-r-10' alt="Image 1" />
                  </div>
                  <div>
                    <text className='text-2xl flex flex-col justify-centre'>Summary</text>
                    <Divider />
                    {loading ? (
                      <React.Fragment>
                        <Spinner/> Loading...
                      </React.Fragment>
                
                 ) : (
                    <div>
                      <div className='flex flex-row pt-2'>
                            <FaCircle className=' text-green-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Active Notes : {notesCount}</div>
                              </text>
                          </div>
                    </div>
                  )
                }
                    
                    
                  </div>
                </div>
              
            </Link>
          </Card>

          <Card className='border hover:border-blue-500'>
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

          <Card className='border hover:border-blue-500'>
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
    </div>
  );
}
