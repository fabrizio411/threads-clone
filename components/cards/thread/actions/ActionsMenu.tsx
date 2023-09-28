'use client'

import LikeIcon from '@/components/icons/thread-icons/LikeIcon'
import './actionsmenu.scss'
import CommentIcon from '@/components/icons/thread-icons/CommentIcon'
import RepostIcon from '@/components/icons/thread-icons/RepostIcon'
import { useState } from 'react'

const ActionsMenu = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const handleLike = () => {
    if (isLiked) setIsLiked(false)
    else setIsLiked(true)
  }

  return (
    <div className='action-menu-component'>
      <div className='action-btn' onClick={handleLike}>
        <LikeIcon isLiked={isLiked} />
      </div>
      <div className='action-btn'>
        <CommentIcon />
      </div>
      <div className='action-btn'>
        <RepostIcon />
      </div>
    </div>
  )
}

export default ActionsMenu