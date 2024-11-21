// app/api/posts/route.ts

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { content, name } = await req.json()
  const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || null

  try {
    const post = await prisma.post.create({
      data: {
        content,
        name: name || `Guest-${Math.floor(Math.random() * 1000)}`,
        ipAddress,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}