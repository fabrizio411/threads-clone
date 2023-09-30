'use server'

import { revalidatePath } from 'next/cache'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import { connectDB } from '../mongoose'
import { Chilanka } from 'next/font/google'

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
            author: userId,
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

export async function getThreads(pageNumber = 1, pageSize = 20) {
    try {
        connectDB()

        const skipAmount = (pageNumber - 1) * pageSize

        const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ 
                path: 'author', 
                model: User,
                select: '_id username image'
            })
            .populate({ 
                path: 'children',
                populate: {
                    path: 'author',
                    model: User,
                    select: '_id username parentId image'
                }
            })

        const totalThreadsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })

        const threads = await threadsQuery.exec()

        const isNext = totalThreadsCount > skipAmount + threads.length

        return { threads, isNext }
        
    } catch (error: any) {
        throw new Error(`FETCHTHREAD_ERROR ${error.message}`)
    }
}

export async function deleteThread(threadId: string, path: string) {
    try {
        connectDB()

        await Thread.findByIdAndDelete(threadId)

        // Efecto cascade para eliminar comentarios

        revalidatePath(path)
        
    } catch (error: any) {
        throw new Error(`DELETETHREAD_ERROR ${error.message}`)
    }
}

export async function getProfileThreads(userId: string, pageNumber = 1, pageSize = 20) {
    try {
        connectDB()

        const skipAmount = (pageNumber - 1) * pageSize

        const threadsQuery = Thread.find({ parentId: {$in: [null, undefined] }, author: userId })
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ 
                path: 'author', 
                model: User,
                select: '_id username image' })
            .populate({ 
                path: 'children',
                populate: {
                    path: 'author',
                    model: User,
                    select: '_id username parentId image'
                }
            })

        const totalThreadsCount = await Thread.countDocuments({ parentId: {$in: [null, undefined] }, userId })

        const threads = await threadsQuery.exec()

        const isNext = totalThreadsCount > skipAmount + threads.length

        return { threads, isNext }
        
    } catch (error: any) {
        throw new Error(`GETTHREADS_ERROR ${error.message}`)
    }
}