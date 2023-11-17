import { Tabs,Tab, Button } from "@nextui-org/react";
import React from "react";

export default function Header() {
  return (
    <div className="flex flex-col gap-5 items-center">
      Hello This will be the gudgetios Dashboard page
      <Button>
          Notes
      </Button>
    
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  )
}
