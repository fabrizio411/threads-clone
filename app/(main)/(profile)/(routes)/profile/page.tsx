import { User } from '@prisma/client'
import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import './style.scss'
import { getUser } from '@/libs/actions/user.actions'
import ProfileDisplay from '../../components/threads/ProfileDisplay'

const ProfilePage = async (ads: User) => {

  const user = await getUser()

  return (
    <div className='page profile-page'>
      <ProfileHeader isPrivate={user.isPrivate}/>
      <ProfileInfo user={user}/>
      <ProfileDisplay />
    </div>
  )
}

export default ProfilePage