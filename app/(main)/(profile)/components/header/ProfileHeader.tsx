import GlobeIcon from '@/components/icons/GlobeIcon'
import MenuIcon from '@/components/icons/nav-icons/MenuIcon'
import './profileheader.scss'
import Link from 'next/link'
import LockIcon from '@/components/icons/LockIcon'

interface ProfileHeaderProps {
  isPrivate: boolean
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isPrivate }) => {
  return (
    <section className='profile-header-component'>
      <Link href='/settings'>
        {!isPrivate ? (
          <GlobeIcon/>
        ) : (
          <LockIcon/>
        )}
      </Link>
      <Link href='/settings'>
        <MenuIcon/>
      </Link>
    </section>
  )
}

export default ProfileHeader