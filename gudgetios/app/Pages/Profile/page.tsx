'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {checkuser,signOut} from '../../components/checkuser'
import { Avatar, Button, Card, CardFooter, Input } from '@nextui-org/react';
import { getProfileService } from '@/app/services/ProfileService';

const Profile = () => {

    const router = useRouter();
    let Username = 'jane.doe';
    let Email = 'jane@doe.com';


  async function Science() {
    
    checkuser().then((cake) => {
      if(cake == false)
        router.push('/login');
    });

    getProfileService().then((user) => {
        Username = user.Username;
        Email = user.email!;
        console.log(Username);
        console.log(Email);
        
    });
  }

  useEffect(() => {
    
  Science();
  

  }, []);

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <Card className='border border-cyan-500  items-center'>
        <h1 className=' text-2xl'>Profile</h1>
        <Card>
            <div className='flex items-center flex-col justify-between'>
                <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" 
                className='w-32 h-32'
                />
            </div>
        </Card>
                <div>
                    <Input type="text" variant='bordered' 
                    label="Username" disabled 
                    value={Username} className='py-1'/>
                    <Input type="email" variant='bordered' 
                    label="Email" disabled 
                    value={Email} className='py-1'/>
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