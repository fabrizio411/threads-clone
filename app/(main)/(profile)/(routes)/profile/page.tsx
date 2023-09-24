import { User } from '@prisma/client'
import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import './style.scss'
import { getUser } from '@/libs/actions/user.actions'

const ProfilePage = async (ads: User) => {

  const user = await getUser()

  return (
    <div className='page profile-page'>
      <ProfileHeader isPrivate={user.isPrivate}/>
      <ProfileInfo user={user}/>
    </div>
  )
}

export default ProfilePage