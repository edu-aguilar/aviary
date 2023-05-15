"use client";

import { User } from "@prisma/client"
import { Button } from "flowbite-react";
import { signOut } from "next-auth/react";

interface NavBarProps {
  user: User | null;
}
const NavBar: React.FC<NavBarProps> = ({user}) => {
  return (
    <header className="flex justify-between items-center p-6 shadow-md">
      <h1>Aviario</h1>
      {user && 
        <div className="flex items-center">
          <p>{user.name}</p>
          <Button className="ml-6" onClick={() => {signOut()}}>logout</Button>
        </div>
      }
    </header>
  )
}


export default NavBar;
