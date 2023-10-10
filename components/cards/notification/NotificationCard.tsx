import { NotificationVariant } from '@/libs/types'
import './notificationcard.scss'
import Image from 'next/image'

interface NotificationCardProps {
  currentUserId: string
  variant: NotificationVariant,
  from: {
    _id: string,
    username: string,
    image: string
  }
  createdAt: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({ variant, from, createdAt }) => {
  return (
    <article>
      <div className='notification-container'>
        <Image alt='profile photo' src={from.image || '/images/placeholder.jpg'} height={40} width={40} />
        <div className='info-box'>
          <div className='user-info'>
            <h3 className='username'>{from.username}</h3>
            <p className='time'></p>
          </div>
          <div className='notification-info'>
            <p>
              {variant === 'follow request' && 'Follow request'}
            </p>
          </div>
        </div>
      </div>

      {variant === 'follow request' && (
        <div className='actions-btns'>Confirm</div>
      )}
    </article>
  )
}

export default NotificationCard