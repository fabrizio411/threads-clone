import { getUser } from '@/libs/actions/user.actions'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, username, email, password, bio, isPrivate, image } = body

        if (!name || !email || !username || !password) {
            return new NextResponse('Missing Info', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        connectDB()

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            bio,
            isPrivate,
            image
        })

        const createdUser = newUser.save()
        
        return NextResponse.json(createdUser)
    } catch (error: any) {
        console.log('REGISTRATION_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}