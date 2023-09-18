import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, username, email, password, bio, isPrivate } = body

        if (!name || !email || !username || !password) {
            return new NextResponse('Missing Info', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                bio,
                isPrivate
            }
        })
        
        return NextResponse.json(user)
    } catch (error: any) {
        console.log('REGISTRATION_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}