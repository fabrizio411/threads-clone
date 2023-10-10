'use client'

import { useState } from 'react'

import LikeIcon from '@/components/icons/thread-icons/LikeIcon'
import CommentIcon from '@/components/icons/thread-icons/CommentIcon'
import RepostIcon from '@/components/icons/thread-icons/RepostIcon'
import './actionsmenu.scss'
import Link from 'next/link'
import { likeThread } from '@/libs/actions/threads.actions'
import { usePathname } from 'next/navigation'
import path from 'path'

interface ActionsMenuProps {
  authorUsername: string,
  threadId: string,
  authorId: string,
  currentUserId: string,
  likes: string[],
  replies: number,
  hasComments: boolean
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ authorUsername, currentUserId, threadId, authorId, likes, replies, hasComments }) => {
  const pathname = usePathname()
  const [likesNum, setLikesNum] = useState<number>(likes.length)
  const [isLiked, setIsLiked] = useState<boolean>(likes.includes(currentUserId) || false)

  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false)
      setLikesNum(likesNum - 1)
      await likeThread({
        isLike: false,
        threadId: threadId,
        authorId: authorId,
        from: currentUserId,
        path: pathname
      })
    }
    else {
      setIsLiked(true)
      setLikesNum(likesNum + 1)
      await likeThread({
        isLike: true,
        threadId: threadId,
        authorId: authorId,
        from: currentUserId,
        path: pathname
      })
    }
  }

  return (
    <>
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

      <div className='interactions-info'>
          {hasComments && (
            <>
              <Link href={`/@${authorUsername}/${threadId}`} className='replies interaction'>{replies} replies</Link>
              <span>-</span>
            </>
          )}
          <p className='likes interaction'>{likesNum} likes</p>
        </div>
    </>
  )
}

export default ActionsMenu