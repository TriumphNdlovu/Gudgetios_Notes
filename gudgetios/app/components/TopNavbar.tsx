import { Navbar, Link, NavbarContent } from '@nextui-org/react';

export default function TopNavbar() {
  return (
    <Navbar >
      <h3>Gudgetios</h3>
      <NavbarContent>
        <Link href="/about" >
          About
        </Link>
      
        <Link href="/work" >
          Work
        </Link>
      
        <Link href="/contact">
          Contact
        </Link>
    </NavbarContent>
    </Navbar>
  );
}