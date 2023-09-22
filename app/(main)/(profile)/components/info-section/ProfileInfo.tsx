'use client'

import Image from 'next/image'
import './profileinfo.scss'
import { useState } from 'react'

interface ProfileInfoProps {
  user: {
    name: string,
    username: string,
    bio: string,
    image: string,
    isPrivate: boolean,
    followersIds: string[],
    followingIds:  string[],
    followersPendingIds: string[]
  }
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const { name, username, bio, image, isPrivate, followersIds, followingIds, followersPendingIds } = user  

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleFollowersModal = () => {
    if (isOpen) setIsOpen(false)
    else setIsOpen(true)
  }

  const imageURL = image || '/images/placeholder.jpg'
  
  return (
    <section className='profile-info-component'>
      <div className='main-info'>
        <div className='personal-info'>
          <h3 className='name'>{name}</h3>
          <p className='username'>{username}</p>
        </div>
        <div className='image-box'>
          <Image src={imageURL} alt='profile-pic' fill />
        </div>
      </div>
      <p className='bio'>{bio}</p>
      <div className='followers' onClick={handleFollowersModal}>
        {followersIds.length} followers
      </div>
      <div className='action-btn-box'>
        <button className='btn'>Edit Profile</button>
        <button className='btn'>Share Profile</button>
      </div>
    </section>
  )
}

export default ProfileInfo