'use server'

import { revalidatePath } from 'next/cache'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import { connectDB } from '../mongoose'

interface createThreadProps {
    userId: string,
    body: string,
    image: string,
    path: string
}

export async function createThread({ userId, body, image, path }: createThreadProps) {
    try {
        connectDB()

        const createdThread = await Thread.create({
            userId,
            body,
            image
        })

        await User.findByIdAndUpdate(
            userId,
            {
                $push: { threads: createdThread._id }
            }
        )

        revalidatePath(path)
        
    } catch (error: any) {
        throw new Error(`CREATETHREAD_ERROR ${error.message}`)
        
    }
}