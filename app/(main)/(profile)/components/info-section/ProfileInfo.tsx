'use client'

import Image from 'next/image'
import './profileinfo.scss'
import { useState } from 'react'
import ImageModal from './image-modal/ImageModal'

interface ProfileInfoProps {
  user: {
    name: string,
    username: string,
    bio: string,
    image: string,
    isPrivate: boolean,
  }
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const { name, username, bio, image } = user  

  const [isImageOpen, setIsImageOpen] = useState<boolean>(false)

  const handleImageOpen = () => {
    if (isImageOpen) setIsImageOpen(false)
    else setIsImageOpen(true)
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
      <div className='action-btn-box'>
        <button className='btn'>Edit Profile</button>
        <button className='btn'>Share Profile</button>
      </div>

      {isImageOpen && (
        <ImageModal image={image} handleOpenModal={handleImageOpen}/>
      )}
    </section>
  )
}

export default ProfileInfo