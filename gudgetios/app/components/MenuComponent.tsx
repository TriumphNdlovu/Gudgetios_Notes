import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
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
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Menu</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <HomeButton/>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Todos
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Nodes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <div>
            <AuthButton/>
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
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
