'use server'

import User from "../models/user.model"
import { connectDB } from "../mongoose"

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/(auth)/auth/[...nextauth]/route';
import { revalidatePath } from "next/cache";

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

interface updateUserProps {
    name: string,
    username: string,
    bio: string,
    image: string,
    isPrivate: boolean,
    userId: string
}

export async function updateUser({ name, username, bio, image, isPrivate, userId }: updateUserProps) {
    connectDB()

    try {

        await User.findByIdAndUpdate(
            userId,
            {
                name,
                username,
                bio,
                image,
                isPrivate
            },
            { upsert: true  }
        )

        revalidatePath('/profile')

    } catch (error: any) {
        throw new Error(`UPDATE_USER_ERROR: ${error.message}`)
    }
}