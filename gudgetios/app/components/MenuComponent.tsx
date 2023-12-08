import React from "react";
import Link from 'next/link';
import 
{
  Navbar, NavbarBrand, 
  NavbarContent, NavbarItem, 
   Button, NavbarMenu, 
  NavbarMenuItem, NavbarMenuToggle
} 
from "@nextui-org/react";

import AuthButton from './AuthButton';
import HomeButton from "./HomeButton";

export default function MenuComponent() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
  <NavbarBrand>
    <HomeButton/>
  </NavbarBrand>
  <NavbarItem isActive>
  <Link href="#">
    Home
  </Link>
  </NavbarItem>
  <NavbarItem>
  <Link href="../Pages/Notes">
    Notes
  </Link>
  </NavbarItem>
  <NavbarItem>
  <Link href="../Pages/Settings">
    Settings
  </Link>
  </NavbarItem>
</NavbarContent>
      <NavbarContent justify="end">
        <div>
            {/* <AuthButton/> */}
        </div>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
