import NotificationCard from '@/components/cards/notification/NotificationCard'
import './style.scss'
import { getUser } from '@/libs/actions/user.actions'
import { getNotifications } from '@/libs/actions/notifications.action'

const ActivityPage = async () => {
  const user = await getUser()
  const notifications = await getNotifications(user._id)

  return (
    <section className='page activity-page'>
      {notifications.map((item: any) => (
        <NotificationCard 
          key={item._id.toString()}
          variant={item.variant}
          from={item.from}
          createdAt={item.createdAt}
          currentUserId={item.user.toString()}
          _id={item._id.toString()}
          reference={item.reference}
        />
      ))}
    </section>
  )
}

export default ActivityPage