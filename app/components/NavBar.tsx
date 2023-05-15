"use client";

import { User } from "@prisma/client"
import { signOut } from "next-auth/react";

interface NavBarProps {
  user: User | null;
}

const NavBar: React.FC<NavBarProps> = ({user}) => {
  return (
    <>
      <h1>Aviary header</h1>
      {user && 
        <div>
          <p>{user.name}</p>
          <button onClick={() => {signOut()}}>logout</button>
        </div>
      }
    </>
  )
}


export default NavBar;
