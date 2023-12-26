'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {checkuser,signOut,EditProfile} from '../../components/checkuser'
import { Avatar, Button, Card, CardFooter, Input, Spinner } from '@nextui-org/react';
import { getProfileService } from '@/app/services/ProfileService';

const Profile = () => {

    const router = useRouter();
    const [Username, setUsername] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(true);


  async function Science() {
    
    checkuser().then((cake) => {
      if(cake == false)
        router.push('/login');
    });

    try
    {
      getProfileService().then((user) => {
        if (user) {
          setUsername(user.Username);
          setFirstname(user.firstname!);
          setLastname(user.lastname!);

          console.log(Username);
          console.log(Firstname);
          console.log(Lastname);
        } else {
          console.log('User is undefined');
        }
          
      }).then(() => {
        setLoading(false);
      });

    }catch(e)
    {
      console.log(e);
    }
  }

  useEffect(() => {
    
  Science();
  

  }, [Science]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <Card className='border border-cyan-500 items-center w-1/2'>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner/> Loading...
          </div>
          ) : (
            <>
            
            <h1 className=' text-2xl'>Profile</h1>
        <Card>
            <div className='flex items-center flex-col justify-between'>
                <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" 
                className='w-32 h-32'
                />
            </div>
        </Card>
                <div className=' w-4/5'>
                    <Input type="text" variant='bordered' 
                    label="Username" disabled 
                    value={Username} className='py-1'/>
                    <Input type="text" variant='bordered' 
                    label="Firstname" disabled 
                    value={Firstname} className='py-1'/>
                    <Input type="text" variant='bordered' 
                    label="Lastname" disabled 
                    value={Lastname} className='py-1'/>
                </div>
                </>
          )}
        <CardFooter>
            <div className='flex justify-right'>
                <button className=' hover:bg-red-600  y-2 px-4 rounded' 
                onClick={()=>signOut()}>
                    SignOut
                </button>
            </div>
            <div className='flex justify-left'>
                <button className=' hover:bg-blue-600  y-2 px-4 rounded' 
                onClick={()=>EditProfile()}>
                    EditProfile
                </button>
            </div>
        </CardFooter>
       
        </Card>
  </div>
  );
};

export default Profile;