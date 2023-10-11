import Image from 'next/image'
import './usercard.scss'
import Link from 'next/link'
import ActionFollowBtn from './action/ActionFollowBtn'

interface UserCardProps {
  currentUserId: string,
  userId: string,
  isPrivate: boolean
  username: string,
  name: string,
  image: string,
  followersNum: number,
  isFollowing: boolean,
  isPending: boolean,
  followCurrentUser: boolean,
}

const UserCard: React.FC<UserCardProps> = ({ currentUserId, userId, isPrivate, username, name, image, followersNum, isFollowing, isPending, followCurrentUser }) => {
  return (
    <Link className='user-card-component' href={`/@${username}`}>
      <div className='info-box'>
        <Image className='image' alt='profile photo' src={image || '/images/placeholder.jpg'} height={40} width={40} />
        <div className='user-info'>
          <h3 className='username'>{username}</h3>
          <p className='name'>{name}</p>
          <p className='followers'>{followersNum} followers</p>
        </div>
      </div>
      <ActionFollowBtn 
        isFollowing={isFollowing}
        isPending={isPending}
        followCurrentUser={followCurrentUser}
        isPrivate={isPrivate}
        currentUserId={currentUserId}
        id={userId}
      />
    </Link>
  )
}

export default UserCard