'use client'

import { useState } from 'react'
import { followPrivateUser, followUser } from '@/libs/actions/user.actions'
import Image from 'next/image'
import Link from 'next/link'

import './profileinfo.scss'
import ImageModal from './image-modal/ImageModal'
import { usePathname } from 'next/navigation'

interface ProfileInfoProps {
  currentUserId: string
  id: string,
  name: string,
  username: string,
  bio: string,
  image: string,
  isPrivate: boolean,
  followers: string[],
  followRequests: string[],
  followCurrentUser?: string
  variant?: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, username, bio, image, id, isPrivate, variant, followers, followRequests, followCurrentUser, currentUserId }) => {
  const pathname = usePathname()
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(followers.includes(currentUserId))
  const [isPending, setIsPending] = useState<boolean>(followRequests.includes(currentUserId))
  const [followersCount, setFollowersCount] = useState<number>(followers.length)

  const handleImageOpen = () => {
    if (isImageOpen) setIsImageOpen(false)
    else setIsImageOpen(true)
  }

  const handleFollow = async () => {
    if (isPrivate) {
      if (isPending) {
        setIsPending(false)
        await followPrivateUser({
          isFollow: false,
          currentUserId: currentUserId,
          userToFollowId: id,
          path: pathname
        })
      } else {
        setIsPending(true)
        await followPrivateUser({
          isFollow: true,
          currentUserId: currentUserId,
          userToFollowId: id,
          path: pathname
        })
      }
    } else {
      if (isFollowing) {
        setIsFollowing(false)
        setFollowersCount(followers.length - 1)
        await followUser({
          isFollow: false,
          currentUserId: currentUserId,
          userToFollowId: id,
          path: pathname
        })
      }
      else {
        setIsFollowing(true)
        setFollowersCount(followers.length + 1)
        await followUser({
          isFollow: true,
          currentUserId: currentUserId,
          userToFollowId: id,
          path: pathname
        })
      }
    }
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
        {followersCount} followers
      </div>

      {!variant || variant !== 'OTHER' && (
        <div className='action-btn-box'>
          <Link href='/profile/edit' className='btn'>Edit Profile</Link>
          <button className='btn'>Share Profile</button>
        </div>
      )}

      {variant === 'OTHER' && (
        <div className='follow-btn-box'>
          <button className={`btn ${!isFollowing && 'follow'} ${isPending && 'pending'}`} onClick={handleFollow}>
            {isPending ? 'Pending' : isFollowing ? 'Following' : followCurrentUser ? 'Follow Back' : 'Follow'}
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