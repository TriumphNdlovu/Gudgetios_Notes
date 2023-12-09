import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { FaArrowRight, FaGithubSquare, FaLinkedinIn, FaMailchimp } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, button } from '@nextui-org/react';
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function LeftTab() {
  const [isOpen, setIsOpen] = useState(true);
  const links = ['Page 1', 'Page 2', 'Page 3'];

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
  }, []); 

  return (
    <>
      {isOpen && (
        <Card className="h-screen w-64 fixed left-0 top-0 text-white z-50">
        <CardHeader className="text-2xl font-bold mb-4 relative">
          <div className='flex justify-start'>
            Menu
          </div>
          <button onClick={() => setIsOpen(false)} 
          className='absolute top-1 right-0 mt-2 mr-2 hover:-rotate-12'>
            <RxCross1/>
          </button>
        </CardHeader>
        <CardBody>
          The body baba
        </CardBody>




        <CardFooter>
        <div className='flex flex-col'>
            <div className='flex justify-center text-centre'>
              Contact us
            </div>

            <div className='py-2'>
              <Divider />
            </div>

            <div >
              
                <Link href={'https://github.com/TriumphNdlovu'}>
                  <FaGithubSquare/>
                  Github
                </Link>
              
              <button className='px-2 '>
                <FaLinkedinIn className='flex justify-center text-centre'/>
                Linkedin
              </button >
              <button className='px-2 '>
                <FaMailchimp className='flex justify-center text-centre'/>
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
          onClick={() => setIsOpen(true)} 
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 text-2xl
          hover:text-[50px]
          "
        >
          <MdOutlineArrowForwardIos/>
        </button>
      }
    </>
  )
}