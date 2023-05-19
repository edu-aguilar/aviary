import { NextRequest, NextResponse } from "next/server";

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

export async function GET(request: NextRequest) {
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

const getPagination = (request: NextRequest): { pageNumber: number, pageSize: number } => {
  const searchParams = request.nextUrl.searchParams;
  
  const pageNumberParam = searchParams.get("pageNumber");
  const pageSizeParam = searchParams.get("pageSize");

  const pageNumber = pageNumberParam ? parseInt(pageNumberParam) : 1;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam) : 10;

  return {
    pageNumber,
    pageSize
  };
}
