
import 
{
   Accordion, AccordionItem, Menu 

} 
from '@nextui-org/react';

import lefttab from './components/leftTab';

import MenuComponent from './components/MenuComponent';

export default function Index() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

 

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="sticky top-0 z-50">
        <MenuComponent />
        
      </div>
      <div>
        <lefttab/>
      </div>
      
      
      <div className="flex flex-col items-center justify-center py-2 flex-grow f">
        <div className="sidebar">
          <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
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