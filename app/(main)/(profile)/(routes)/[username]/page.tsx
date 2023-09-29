'use client'

import { getUser } from '@/libs/actions/user.actions'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import ProfileDisplay from '../../components/threads/ProfileDisplay'

import '../profile/style.scss'

interface UserProps {
  _id: string,
  name: string,
  username: string,
  bio: string,
  image: string,
  isPrivate: boolean,
  isCurrentUser: boolean
}

const ProfileExtaPage = () => {
  const router = useRouter()
  const params = useParams()

  const getParamsUsername = () => {
    if (Array.isArray(params.username)) {
      return params.username[0].slice(3)
    }

    return params.username.slice(3)
  }

  const [user, setUser] = useState<UserProps>({
    _id: '',
    name: '',
    username: '',
    bio: '',
    image: '',
    isPrivate: true,
    isCurrentUser: false
  })

  useEffect(() => {
    const getParamsUser = async () => {
      const paramsUser = await getUser(getParamsUsername())
      setUser(paramsUser)
    }
    
    getParamsUser()
  }, [])

  if (user && user.isCurrentUser) router.push('/profile')

  return (
    <div className='page profile-page'>
      <ProfileHeader isPrivate={user.isPrivate} variant='OTHER'/>
      <ProfileInfo 
        id={user._id}
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

export default ProfileExtaPage