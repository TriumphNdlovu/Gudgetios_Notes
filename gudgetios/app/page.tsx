'use client'
import Link from 'next/link';
import MenuComponent from './components/MenuComponent';
import TodoList from './Pages/Todolist/page';
import { Card, CardBody,Spinner, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';
import { getUpdatesService } from './services/TodoService';
import { getNotes } from './repository/NoteCrud';
import { getNotesService, getUpdateService } from './services/NoteService';
import { FaCalendarDay, FaCalendarMinus, FaCalendarWeek, FaCheck, FaCircle, FaClock, FaCross, FaHeartBroken } from 'react-icons/fa';
import { Router } from 'next/router';
import { redirect } from 'next/navigation'
import { sessionDetection } from './services/sessionDetection';
import { checkuser } from './components/checkuser';
import { useRouter } from 'next/navigation'


// import Header from './components/Header';

export default function Index() {
  
  const router = useRouter();
  const [Active, setActive] = React.useState<number>(0);
  const [Completed, setCompleted] = React.useState<number>(0);
  const [ActiveEvents, setActiveEvents] = React.useState<number>(0);
  const [TodayEvents, setTodayEvents] = React.useState<number>(0);
  const [ThisMonthEvents, setThisMonthEvents] = React.useState<number>(0);
  const [Overdue, setOverdue] = React.useState<number>(0);
  const [Total, setTotal] = React.useState<number>(0);
  const [notesCount, setNotesCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  


  React.useEffect(() => {


    checkuser().then((logged) => {
      if(logged == false)
        router.push('./Pages/login');
    });
    
    getUpdatesService().then((data) => {
      setActive(data.Active);
      setCompleted(data.Completed);
      setOverdue(data.Overdue);
      setTotal(data.Total);
      setActiveEvents(data.ActiveEvents);
      setTodayEvents(data.TodayEvents);
      setThisMonthEvents(data.ThisMonthEvents);

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
    <div className="flex flex-col justify-between w-full ">
      <div className="flex flex-col w-full p-unit-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card  className=' border hover:border-blue-500  bg-no-repeat bg-cover bg-center' >
            <CardHeader className='text-2xl'>Todos</CardHeader>
              <Link href="./Pages/Todolist" className='px-5 py-5 border-r-5 bg-opacity-90'>
                <div className='flex flex-col text-center'>
                    <div className=''>
                    <text className='text-2xl flex flex-col justify-centre text-center'>Summary</text>
                    <Divider />
                    {loading ? (
                        
                          <React.Fragment>
                            <Spinner/> Loading...
                          </React.Fragment>
                    
                    ) : (
                        <div className='flex flex-col text-center justify-center items-center'>
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

          <Card className='border  hover:border-blue-500  bg-no-repeat bg-cover bg-center'>
            <CardHeader className='text-2xl'>Notes</CardHeader>
              <Link href="./Pages/Notes" className='px-5 py-5 border-r-5'>
                <div className='flex flex-col text-center'>
                  <div>
                    <text className='text-2xl flex flex-col justify-centre'>Summary</text>
                    <Divider />
                    {loading ? (
                      <React.Fragment>
                        <Spinner/> Loading...
                      </React.Fragment>
                
                 ) : (
                  <div className='flex flex-col text-center justify-center items-center'>
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

          <Card className='border hover:border-blue-500  bg-no-repeat bg-cover bg-center'>
            <CardHeader className='text-2xl'>Calendar</CardHeader>
              <Link href="./Pages/Calendar" className='px-5 py-5 border-r-5'>
                <div className='flex flex-col text-center'>
                  <div className='flex flex-col text-center'>
                    <text className='text-2xl flex flex-col justify-centre'>Summary</text>
                    <Divider />
                    {loading ? (
                      <React.Fragment>
                        <Spinner/> Loading...
                      </React.Fragment>
                
                 ) : (
                  <div className='flex flex-col text-center justify-center items-center'>
                      <div className='flex flex-row pt-2'>
                            <FaCircle className=' text-green-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Active Events : {ActiveEvents}</div>
                              </text>
                      </div>
                      <div className='flex flex-row pt-2'>
                            <FaCalendarDay className=' text-blue-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Today : {TodayEvents}</div>
                              </text>
                      </div>
                      <div className='flex flex-row pt-2'>
                            <FaCalendarWeek className=' text-purple-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> This Month : {ThisMonthEvents}</div>
                              </text>
                      </div>
                    </div>
                  )
                }
                    
                    
                  </div>
                </div>
              
            </Link>
          </Card>

          <Card  className=' border hover:border-blue-500 bg-[url("./Assets/blackandred.jpg")] bg-no-repeat bg-cover bg-center' >
            <CardHeader className='text-2xl'>Comming Soon...</CardHeader>
              <Link href="./" className='px-5 py-5 border-r-5'>
              <div className='flex flex-col text-center'>
                <div className='flex flex-col text-center'>
                    <text className='text-2xl flex flex-col justify-centre'>Summary</text>
                    <Divider />
                    {loading ? (
                      <React.Fragment>
                        <Spinner/> Loading...
                      </React.Fragment>
                
                 ) : (
                  <div className='flex flex-col text-center justify-center items-center'>
                      <div className='flex flex-row pt-2'>
                            <FaHeartBroken className=' text-red-600 '/>
                              <text className='text-sm flex px-3'>
                                <div className=''> Coming soon...</div>
                              </text>
                      </div>
                    </div>
                      
                  )
                }
                  </div>
                </div>
              
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
