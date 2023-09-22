import { User } from '@prisma/client'
import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import './style.scss'

const ProfilePage = async (ads: User) => {

  const user = {
    name: 'Ryleed',
    username: '_unacuentarandom_',
    bio: 'test bio',
    image: '',
    isPrivate: true,
    followersIds: ['dad', 'asd', 'asd', 'asd'],
    followingIds: ['dad', 'asd', 'asd', 'asd' , 'asd', 'asd', 'asd' ],
    followersPendingIds: ['dad', 'asd']
  }

  return (
    <div className='page'>
      <ProfileHeader isPrivate={user.isPrivate}/>
      <ProfileInfo user={user}/>
    </div>
  )
}

export default ProfilePage