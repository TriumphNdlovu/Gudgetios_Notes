import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { FaArrowRight, FaGithubSquare, FaLinkedinIn, FaMailchimp } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, button } from '@nextui-org/react';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RiTodoLine, RiStickyNoteLine, RiSettings3Line, RiCalendarLine, RiProfileFill, RiProfileLine, RiAccountBoxLine, RiHome2Fill, RiHomeSmile2Fill } from 'react-icons/ri';
import { redirect, useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
type LeftTabProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const LeftTab: React.FC<LeftTabProps> = ({ setIsOpen }) => {
  
  const [isOpen, setIsOpenLocal] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 968) { // 768px portrait
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };


    window.addEventListener('resize', handleResize);
    handleResize();


    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  

  // const LeftTab: React.FC<LeftTabProps> = ({ setIsOpen }) => {
  //   return (
  //     <div>
  //       <button onClick={() => setIsOpen(true)}>Open</button>
  //       <button onClick={() => setIsOpen(false)}>Close</button>
  //     </div>
  //   );
  // };
  return (
    <>
      {isOpen && (
        <Card className="h-screen w-64 fixed left-0 top-0 text-white z-50">
          <CardHeader className="text-2xl font-bold mb-4 relative">
            <div className='flex justify-start'>
              Menu
            </div>

            <button onClick={() => {setIsOpen(false); setIsOpenLocal(false)}}
              className='absolute top-1 right-0 mt-2 mr-2 hover:-rotate-12'>
              <RxCross1 />
            </button>
          </CardHeader>

          <CardBody>
            <div className="flex flex-col items-start space-y-3">

            <Link href="../">
                <p className={`flex items-center text-lg hover:text-blue-900 ${usePathname() === '/' ? 'text-blue-900' : ''}`}>
                  <RiHomeSmile2Fill className="mr-2" /> Home
                </p>
              </Link>

            <Divider />

            <Link href="../Pages/Profile">
                <p className={`flex items-center text-lg hover:text-orange-500 ${usePathname() === '/Pages/Profile' ? 'text-orange-500' : ''}`}>
                  <RiAccountBoxLine className="mr-2" /> Profile
                </p>
              </Link>

              <Divider />

              <Link href="../Pages/Todolist">
                <p className={`flex items-center text-lg hover:text-blue-500 ${usePathname() === '/Pages/Todolist' ? 'text-blue-500' : ''}`}>
                  <RiTodoLine className="mr-2" /> Todo List
                </p>
              </Link>

              <Divider />

              <Link href="../Pages/Notes">
                {/* <p className="flex items-center text-lg hover:text-green-500"> */}
                <p className={`flex items-center text-lg hover:text-green-500 ${usePathname() === '/Pages/Notes' ? 'text-green-500' : ''}`}>

                  <RiStickyNoteLine className="mr-2" /> Notes
                </p>
              </Link>

              <Divider />

              <Link href="../Pages/Calendar">
                {/* <p className="flex items-center text-lg hover:text-pink-500"> */}
                <p className={`flex items-center text-lg hover:text-pink-500 ${usePathname() === '/Pages/Calendar' ? 'text-pink-500' : ''}`}>

                  <RiCalendarLine className="mr-2" /> Calendar
                </p>
              </Link>

              <Divider />

              <Link href="../Pages/Settings">
                {/* <p className="flex items-center text-lg hover:text-purple-500"> */}
                <p className={`flex items-center text-lg hover:text-purple-500 ${usePathname() === '/Pages/Settings' ? 'text-purple-500' : ''}`}>

                  <RiSettings3Line className="mr-2" /> Settings
                </p>
              </Link>

              <Divider />

            </div>
          </CardBody>




          <CardFooter>

            <div className='flex flex-col'>
              <div className='flex justify-center text-centre'>
                Contact us
              </div>

              <div className='py-2'>
                <Divider />
              </div>

              <div>
                <button className='px-2' onClick={() => {
                  window.open('https://github.com/TriumphNdlovu', '_blank');
                }}>
                  <FaGithubSquare />
                  Github
                </button>


                <button className='px-2 ' onClick={() => {
                  window.open('https://www.linkedin.com/in/triumph-ndlovu-425b73274/', '_blank');
                }}>
                  <FaLinkedinIn className='' />
                  Linkedin
                </button >

                <button className='px-2 'onClick={() => {
                  window.open('mailto:realtriumphndlovu@gmail.com', '_blank');
                }}>
                  <FaMailchimp className='' />
                  Gmail
                </button>
              </div>
            </div>

          </CardFooter>

          {/* <AuthButton/> */}
        </Card>
      )}
      {
        !isOpen &&
        <button
          onClick={() => {setIsOpen(true); setIsOpenLocal(true)}}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 text-2xl
          hover:text-[50px]
          "
        >
          <MdOutlineArrowForwardIos />
        </button>
      }
    </>
  )
}
export default LeftTab;