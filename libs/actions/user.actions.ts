'use server'

import User from "../models/user.model"
import Notification from '../models/notification.model';
import { connectDB } from "../mongoose"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/(auth)/auth/[...nextauth]/route';
import { revalidatePath } from "next/cache";


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

        return {
            _id: user._id.toString(),
            name: user.name,
            username: user.username,
            bio: user.bio,
            image: user.image,
            isPrivate: user.isPrivate,
            isCurrentUser: user._id.toString() === currentUser._id.toString(),
            followers: user.followers,
            followRequests: user.followRequests,
        }
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