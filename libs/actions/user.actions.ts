'use server'

import User from "../models/user.model"
import { connectDB } from "../mongoose"

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/(auth)/auth/[...nextauth]/route';

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getUser() {
    connectDB()

    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const user = await User.findOne({ email: session.user.email })

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        return null
    }
}