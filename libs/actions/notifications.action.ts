'use server'

import { revalidatePath } from 'next/cache'
import Notification from '../models/notification.model'
import User from '../models/user.model'
import { connectDB } from '../mongoose'

export async function getNotifications(userId: string) {
    try {
        connectDB()

        const notificationsQuery = Notification.find({ user: userId })
            .sort({ createdAt: 'desc' })
            .populate({
                path: 'from',
                model: User,
                select: '_id image username'
            })

        const notifications = await notificationsQuery.exec()

        return notifications

    } catch (error: any) {
        throw new Error(`GETNOTIFICATON_ERROR: ${error.message}`)
    }
}

export async function getNotificationNumber(userId: string) {
    try {
        connectDB()

        const totalNotifications = await Notification.countDocuments({ user: userId })

        return totalNotifications

    } catch (error: any) {
        throw new Error(`GETNOTIFICATONNUMBER_ERROR: ${error.message}`)
        
    }
}

export async function deleteFollowRequest(notificationId: string) {
    try {
        connectDB()

        const deletedNotification = await Notification.findByIdAndDelete(notificationId)

        await User.findByIdAndUpdate(
            deletedNotification.user,
            { $pull: { followRequests: deletedNotification.from }}
        )

        revalidatePath('/activity')
        
    } catch (error: any) {
        throw new Error(`DELETENOTIFICATION_ERROR: ${error.message}`)
    }
}