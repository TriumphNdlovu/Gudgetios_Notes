import { Tabs,Tab, Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="flex flex-col gap-5 items-center">
       <div>
       <img 
        src='../Assets/testing.jpg'
        alt="Gudgetios"
        width={100}
        height={100}
      ></img>
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      
    </div>
  );
}
