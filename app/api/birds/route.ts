import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/lib/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json()
  console.log(body);
  
  // validate body?!?!?
  const { name, bornAt } = body;

  const bird = await prisma.bird.create({
    data: {
      bornAt,
      name,
    }
  });

  return new NextResponse(JSON.stringify(bird), {
    status: 201,
  });
}
