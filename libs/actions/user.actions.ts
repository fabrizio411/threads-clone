'use server'

import User from "../models/user.model"
import Notification from '../models/notification.model';
import { connectDB } from "../mongoose"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/(auth)/auth/[...nextauth]/route';
import { revalidatePath } from "next/cache";
import { FilterQuery, SortOrder } from "mongoose";


export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getUser(username?: string) {
    connectDB()

    try {
        if (!username) {
            const session = await getSession()
        
            if (!session?.user?.email) {
                return null
            }
            
            const user = await User.findOne({ email: session.user.email })
            
            if (!user) {
                return null
            }
            
            return user
        }

        const user = await User.findOne({ username })
        const currentUser: any = await getUser()

        if (!user) return null

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

interface followUserProps {
    isFollow: boolean
    currentUserId: string,
    userToFollowId: string,
    path: string
}

export async function followUser({ isFollow, currentUserId, userToFollowId, path }: followUserProps) {
    try {
        connectDB()

        if (isFollow) {
            await User.findByIdAndUpdate(
                currentUserId,
                { $push: { following: userToFollowId } }
            )

            await User.findByIdAndUpdate(
                userToFollowId,
                { $push: { followers: currentUserId } }
            )

            await Notification.create({
                user: userToFollowId,
                from: currentUserId,
                variant: 'follow'
            })

        } else {
            await User.findByIdAndUpdate(
                currentUserId,
                { $pull: { following: userToFollowId } }
            )

            await User.findByIdAndUpdate(
                userToFollowId,
                { $pull: { followers: currentUserId } }
            )
        }

        revalidatePath(path)
        
    } catch (error: any) {
        throw new Error(`FOLLOW_USER_ERROR: ${error.message}`)
    }
}

export async function followPrivateUser({ isFollow, currentUserId, userToFollowId, path }: followUserProps) {
    try {
        connectDB()

        if (isFollow) {
            await User.findByIdAndUpdate(
                userToFollowId,
                { $push: { followRequests: currentUserId } }
            )
    
            await Notification.create({
                user: userToFollowId,
                from: currentUserId,
                variant: 'follow request'
            })
            
        } else {
            await User.findByIdAndUpdate(
                userToFollowId,
                { $pull: { followRequests: currentUserId }}
            )

            await Notification.findOneAndDelete({ 
                from: currentUserId, 
                user: userToFollowId, 
                variant: 'follow request' 
            })
        }

    } catch (error: any) {
        throw new Error(`FOLLOW_USER_ERROR: ${error.message}`)
    }
}

export async function acceptFollowRequest(notificationId: string) {
    try {
        connectDB()

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { variant: 'follow' },
        )
        
        await User.findByIdAndUpdate(
            notification.user,
            {
                $pull: { followRequests: notification.from },
                $push: { followers: notification.from }
            }
        )

        await User.findByIdAndUpdate(
            notification.from,
            { $push: { following: notification.user }}
        )


        await Notification.create({
            user: notification.from,
            from: notification.user,
            variant: 'follow accepted'
        })

        revalidatePath('/activity')

    } catch (error: any) {
        throw new Error(`ACCEPTFOLLOWER_ERROR: ${error.message}`)
    }
}

interface searchUsersProps {
    userId: string,
    searchString?: string,
    pageNumber?: number,
    pageSize?: number,
    sortBy?: SortOrder
}

export async function searchUsers({ userId, searchString = '', pageNumber = 1, pageSize = 20, sortBy = 'desc' }: searchUsersProps) {
    try {
        connectDB()

        const skipAmmount = (pageNumber - 1) * pageSize

        const regex = new RegExp(searchString, 'i')

        const query: FilterQuery<typeof User> = {
            _id: { $ne: userId },
        }    

        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }

        const sortOptions = { createdAt: sortBy }

        const userQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmmount)
            .limit(pageSize)

        const totalUserCount = await User.countDocuments(query)

        const users = await userQuery.exec()

        const isNext = totalUserCount > skipAmmount + users.length

        return { users, isNext }

    } catch (error: any) {
        throw new Error(`SEARCH_ERROR: ${error.message}`)
    }
}