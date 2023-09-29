import GlobeIcon from '@/components/icons/GlobeIcon'
import MenuIcon from '@/components/icons/nav-icons/MenuIcon'
import './profileheader.scss'
import Link from 'next/link'
import LockIcon from '@/components/icons/LockIcon'
import Arrow from '@/components/icons/Arrow'

interface ProfileHeaderProps {
  isPrivate: boolean,
  variant: string
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isPrivate, variant }) => {
  return (
    <section className='profile-header-component'>
      {variant === 'SELF' && (
        <>
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
        </>
      )}

      {variant === 'OTHER' && (
        <>
          <Link href='/'>
            <Arrow />
          </Link>
          <div>
            <MenuIcon />
          </div>
        </>
      )}
    </section>
  )
}

export default ProfileHeader