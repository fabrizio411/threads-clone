import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import './style.scss'
import { getUser } from '@/libs/actions/user.actions'
import ProfileDisplay from '../../components/threads/ProfileDisplay'

const ProfilePage = async () => {
  const user = await getUser()

  return (
    <div className='page profile-page'>
      <ProfileHeader isPrivate={user.isPrivate} variant='SELF'/>
      <ProfileInfo 
        id={user._id.toString()}
        name={user.name}
        username={user.username}
        bio={user.bio}
        image={user.image}
        isPrivate={user.isPrivate}
      />
      <ProfileDisplay />
    </div>
  )
}

export default ProfilePage