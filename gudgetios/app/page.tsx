
import { Card, Button } from '@nextui-org/react';
import LeftTab from './components/leftTab';
import MenuComponent from './components/MenuComponent';
import TodoList from './Pages/Todolist/page';
import Header from './components/Header';


export default function Index() {


  return (
    <div className="flex flex-col justify-between min-h-screen">

      <div className="sticky top-0 z-50">
        <MenuComponent />
      </div>

      <div>
        <Header/>
      </div>
   

      <div className="flex-col mx-auto">
          <TodoList/>
          
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