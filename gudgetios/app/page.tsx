
import { Menu } from '@nextui-org/react';
import MenuComponent from './components/MenuComponent';

export default function Index() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="sticky top-0 z-50">
        <MenuComponent />
      </div>
      <div className="flex flex-col items-center justify-center py-2 flex-grow">
        This is the page basically
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