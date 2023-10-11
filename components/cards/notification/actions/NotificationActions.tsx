'use client'

import { deleteFollowRequest } from "@/libs/actions/notifications.action"
import { acceptFollowRequest } from "@/libs/actions/user.actions"

interface NotificationActionsProps {
    notificationId: string
}

const NotificationActions: React.FC<NotificationActionsProps> = ({ notificationId }) => {
    const handleDeleteRequest = async () => {
        await deleteFollowRequest(notificationId)
      }
    
      const handleConfirmRequest = async () => {
        await acceptFollowRequest(notificationId)
      }

  return (
    <div className='actions-btns'>
        <button className='btn' onClick={handleConfirmRequest}>Confirm</button>
        <button className='btn' onClick={handleDeleteRequest}>Delete</button>
    </div>
  )
}

export default NotificationActions