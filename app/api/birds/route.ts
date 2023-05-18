import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/lib/prismadb";
import { NextApiRequest } from "next";

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

export async function GET(request: NextApiRequest) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const pagination = getPagination(request);

  const birds = await prisma.bird.findMany({
    skip: (pagination.pageNumber - 1) * pagination.pageSize,
    take: pagination.pageSize,
  });

  return new NextResponse(JSON.stringify(birds), {
    status: 200,
  });
}

const getPagination = (request: NextApiRequest): { pageNumber: number, pageSize: number } => {
  const { pageNumber, pageSize } = request.query;

  const pagination = {
    pageNumber: pageNumber ? (Array.isArray(pageNumber) ? parseInt(pageNumber[0]) : parseInt(pageNumber)) : 1,
    pageSize: pageSize ? (Array.isArray(pageSize) ? parseInt(pageSize[0]) : parseInt(pageSize)) : 1,
  }

  return pagination;
}