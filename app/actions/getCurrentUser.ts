import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/lib/prismadb";


export default async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email || ""
    }
  })

  if (!currentUser) {
    return null;
  }

  return currentUser;
}
