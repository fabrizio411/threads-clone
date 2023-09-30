'use client'

import Image from 'next/image'
import './profileinfo.scss'
import { useState } from 'react'
import ImageModal from './image-modal/ImageModal'
import Link from 'next/link'

interface ProfileInfoProps {
  id: string,
  name: string,
  username: string,
  bio: string,
  image: string,
  isPrivate: boolean,
  variant?: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, username, bio, image, id, variant }) => {

  const [isImageOpen, setIsImageOpen] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const handleImageOpen = () => {
    if (isImageOpen) setIsImageOpen(false)
    else setIsImageOpen(true)
  }

  const handleFollow = () => {
    if (isFollowing) setIsFollowing(false)
    else setIsFollowing(true)
  }

  const imageURL = image || '/images/placeholder.jpg'
  
  return (
    <section className='profile-info-component'>
      <div className='main-info'>
        <div className='personal-info'>
          <h3 className='name'>{name}</h3>
          <p className='username'>{username}</p>
        </div>
        <button className='image-box' onClick={handleImageOpen}>
          <Image className='img' src={imageURL} alt='profile-pic' fill />
        </button>
      </div>
      <p className='bio'>{bio}</p>
      <div className='followers'>
        0 followers
      </div>

      {!variant || variant !== 'OTHER' && (
        <div className='action-btn-box'>
          <Link href='/profile/edit' className='btn'>Edit Profile</Link>
          <button className='btn'>Share Profile</button>
        </div>
      )}

      {variant === 'OTHER' && (
        <div className='follow-btn-box'>
          <button className={`btn ${!isFollowing && 'follow'}`} onClick={handleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className='btn mention'>Mention</button>
        </div>
      )}

      {isImageOpen && (
        <ImageModal image={image} handleOpenModal={handleImageOpen}/>
      )}
    </section>
  )
}

export default ProfileInfo