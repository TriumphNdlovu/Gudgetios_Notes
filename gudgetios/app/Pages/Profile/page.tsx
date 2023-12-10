'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {checkuser,signOut} from '../../components/checkuser'
import { Avatar, Button, Card, CardFooter, Input } from '@nextui-org/react';

const Profile = () => {

    const router = useRouter();


  async function Science() {
    
    checkuser().then((cake) => {
      if(cake == false)
        router.push('/login');
    });
  }

  useEffect(() => {
    
  Science();

  }, []);

  return (
    <div className='h-screen flex flex-col justify-center'>
      <Card className='border border-cyan-500 max-w-2xl items-center'>
        <h1 className=' text-2xl'>Profile</h1>
        <Card>
            <div className='flex items-center flex-col justify-between'>
                <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" 
                className='w-32 h-32'
                />
            </div>
        </Card>
                <div>
                    <Input type="text" variant='bordered' label="Username" disabled value={'@24Louche_'} className='py-1'/>
                    <Input type="text" variant='bordered' label="Name" disabled value={'Triumph'} className='py-1'/>
                    <Input type="text" variant='bordered' label="Surname" disabled value={'Ndlovu'} className='py-1'/>
                    <Input type="email" variant='bordered' label="Email" disabled value={'realtriumphndlovu@gmail.com'} className='py-1'/>
                </div>
        <CardFooter>
            <div className='flex justify-right'>
                <button className=' hover:bg-red-600  y-2 px-4 rounded' 
                onClick={()=>signOut()}>
                    SignOut
                </button>
            </div>
        </CardFooter>
            
      </Card>
    </div>
  );
};

export default Profile;