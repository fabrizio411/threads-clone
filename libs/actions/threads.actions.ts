'use server'

import { revalidatePath } from 'next/cache'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import { connectDB } from '../mongoose'
import Notification from '../models/notification.model'

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
            { $push: { threads: createdThread._id } }
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

export async function getOneThread(threadId: string) {
    try {
        connectDB()

        const threadQuery = Thread.findById(threadId)
            .populate({ 
                path: 'author', 
                model: User,
                select: '_id username image isPrivate'
            })
            .populate({ 
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: '_id username parentId image'
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: '_id username parentId image'
                        }
                    }
                ]
            })
        
        const thread = await threadQuery.exec()

        return thread

    } catch (error: any) {
        throw new Error(`GETONETHREAD_ERROR ${error.message}`)
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
        throw new Error(`GETPROFILETHREADS_ERROR ${error.message}`)
    }
}

interface likeThreadProps {
    isLike: boolean,
    threadId: string,
    authorId: string,
    from: string,
    path: string
}

export async function likeThread({ isLike, threadId, authorId, from, path }: likeThreadProps) {
    try {
        connectDB()

        if (isLike) {
            // await Notification.create({
            //     user: authorId,
            //     from: from,
            //     type: 'like'
            // })

            await Thread.findByIdAndUpdate(
                threadId,
                { $push: { likes: from } }
            )
        } else {
            await Thread.findByIdAndUpdate(
                threadId,
                { $pull: { likes: from } }
            )
        }

        revalidatePath(path)
        
    } catch (error: any) {
        throw new Error(`GETTHREADS_ERROR ${error.message}`)
    }
}

interface createCommentProps {
    parentId: string,
    author: string,
    body: string,
    image: string,
    path: string
}

export async function createComment({ parentId, author, body, image, path }: createCommentProps) {
    try {
        connectDB()

        const createdThread = await Thread.create({
            body,
            image,
            author,
            parentId
        })

        await Thread.findByIdAndUpdate(
            parentId,
            { $push: { children: createdThread._id } }
        )

        await User.findByIdAndUpdate(
            author,
            { $push: { threads: createdThread._id } }
        )

        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`CREATECOMMENT_ERROR ${error.message}`)
    }
}