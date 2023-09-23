import User from "@/libs/models/user.model"
import { connectDB } from "@/libs/mongoose"
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.text()

        connectDB()

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const isEmail = emailPattern.test(body)

        if (isEmail) {
            const userFound = await User.findOne({ email: body })
            if (userFound) {
                return new NextResponse('Username already in use', { status: 400 })
            }
        } else {
            const userFound = await User.findOne({ username: body })
            if (userFound) {
                return new NextResponse('Email already in use', { status: 400 })
            }
        }

        return new NextResponse('ok', { status: 200 })
    } catch (error) {
        console.log('CHECKDATA_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}