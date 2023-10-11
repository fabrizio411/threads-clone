import { NotificationVariant } from '@/libs/types'
import './notificationcard.scss'
import Image from 'next/image'
import Link from 'next/link'
import { formatDateString } from '@/libs/utils'
import { deleteFollowRequest } from '@/libs/actions/notifications.action'
import { acceptFollowRequest } from '@/libs/actions/user.actions'
import NotificationActions from './actions/NotificationActions'

interface NotificationCardProps {
  currentUserId: string
  variant: NotificationVariant,
  from: {
    _id: string,
    username: string,
    image: string
  }
  createdAt: string,
  _id: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({ _id, variant, from, createdAt }) => {
  const time = formatDateString(createdAt)

  const handleDeleteRequest = async () => {
    await deleteFollowRequest(_id)
  }

  const handleConfirmRequest = async () => {
    await acceptFollowRequest(_id)
  }

  return (
    <article className='notification-card-component'>
      <div className='notification-container'>
        <Image className='image' alt='profile photo' src={from.image || '/images/placeholder.jpg'} height={40} width={40} />
        <div className='info-box'>
          <div className='user-info'>
            <Link href={`/@${from.username}`} className='username'>@{from.username}</Link>
            <p className='time'>{time}</p>
          </div>
          <div className='notification-info'>
            <p>
              {variant === 'follow request' && 'requestes to follow you.'}
              {variant === 'follow' && 'started following you.'}
              {variant === 'follow accepted' && 'accepted your follow request.'}
              {variant === 'like' && 'liked your post'}
              {variant === 'comment' && 'commented your post'}
              {variant === 'repost' && 'reposted your post'}
              {variant === 'quote' && 'quoted your post'}
            </p>
          </div>
        </div>
      </div>

      {variant === 'follow request' && (
        <NotificationActions notificationId={_id} />
      )}
    </article>
  )
}

export default NotificationCard