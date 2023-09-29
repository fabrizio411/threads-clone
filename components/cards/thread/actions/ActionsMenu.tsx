'use client'

import { useState } from 'react'

import LikeIcon from '@/components/icons/thread-icons/LikeIcon'
import CommentIcon from '@/components/icons/thread-icons/CommentIcon'
import RepostIcon from '@/components/icons/thread-icons/RepostIcon'
import './actionsmenu.scss'
import Link from 'next/link'

interface ActionsMenuProps {
  authorUsername: string,
  threadId: string
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ authorUsername, threadId }) => {
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
      <Link href={`/@${authorUsername}/${threadId}`} className='action-btn'>
        <CommentIcon />
      </Link>
      <div className='action-btn'>
        <RepostIcon />
      </div>
    </div>
  )
}

export default ActionsMenu