import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { FaArrowRight } from 'react-icons/fa';

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
        <div className="h-screen w-64 fixed left-0 top-0 bg-gray-800 text-white z-50">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Menu</h1>
            <ul>
              <li className="mb-2">
                <a href="#home" className="text-white">Home</a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-white">About</a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-white">Contact</a>
              </li>
            </ul>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
          {/* <AuthButton/> */}
        </div>
      )}
      {
        !isOpen && 
        <button 
          onClick={() => setIsOpen(true)} 
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50"
        >
          <FaArrowRight/>
        </button>
      }
    </>
  )
}