
import { Card, Button } from '@nextui-org/react';
import LeftTab from './components/leftTab';
import MenuComponent from './components/MenuComponent';

export default function Index() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="sticky top-0 z-50">
        <MenuComponent />
      </div>

      <div className="flex">
        <div className="w-1/4 max-w-xs">
          <LeftTab />
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto">
          // add a bunch of cards on the page
          
            
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