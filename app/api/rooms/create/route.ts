import prisma from '@/lib/prismaClient'

export async function GET() {
  const createdRoom = await prisma.chatRoom.create({
    data: {},
  })

  return new Response(createdRoom.id)
}
