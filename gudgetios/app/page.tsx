
import MenuComponent from './components/MenuComponent';
import TodoList from './Pages/Todolist/page';
import Header from './components/Header';


export default function Index() {


  return (
  <div className="flex flex-col justify-between min-h-screen min-w-full w-full sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-2/3">

      <div className="sticky top-0 z-50">
        <MenuComponent />
      </div>

      <div>
        <Header/>
      </div>

      <div className="flex items-center justify-center">
        <TodoList/>
      </div>

      {/* <div className="flex items-center justify-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <TodoList/>
      </div> */}
      

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