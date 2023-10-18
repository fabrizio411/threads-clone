'use client'

import { useState } from 'react'

import LikeIcon from '@/components/icons/thread-icons/LikeIcon'
import CommentIcon from '@/components/icons/thread-icons/CommentIcon'
import RepostIcon from '@/components/icons/thread-icons/RepostIcon'
import './actionsmenu.scss'
import Link from 'next/link'
import { likeThread, removeRepost, repostThread } from '@/libs/actions/threads.actions'
import { usePathname } from 'next/navigation'
import RepostActiveIcon from '@/components/icons/thread-icons/RepostActiveIcon'
import QuoteIcon from '@/components/icons/thread-icons/QuoteIcon'

interface ActionsMenuProps {
  authorUsername: string,
  threadId: string,
  authorId: string,
  currentUserId: string,
  likes: string[],
  replies: number,
  hasComments: boolean,
  isReposted?: boolean
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ authorUsername, currentUserId, threadId, authorId, likes, replies, hasComments, isReposted }) => {
  const pathname = usePathname()
  const [likesNum, setLikesNum] = useState<number>(likes.length)
  const [isLiked, setIsLiked] = useState<boolean>(likes.includes(currentUserId) || false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isRepostedState, setIsReposted] = useState<boolean>(isReposted || false)

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

  const handleOpenRepostModal = () => {
    if (isActive) setIsActive(false)
    else setIsActive(true)
  }

  const handleRepost = async () => {
    if (isRepostedState) {
      await removeRepost({
        currentUserId,
        threadId,
        authorId,
        path: pathname
      })
      setIsActive(false)
      setIsReposted(false)
    } else {
      await repostThread({
        currentUserId,
        threadId,
        authorId,
        authorUsername,
        path: pathname
      })
      setIsActive(false)
      setIsReposted(true)
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
        <div className='action-btn repost' onClick={handleOpenRepostModal}>
          {isRepostedState ? (<RepostActiveIcon />) : (<RepostIcon />)}
          <div className={`repost-modal-menu ${isActive && 'active'}`}>
            <div className='option' onClick={handleRepost}>
              {isRepostedState ? (
                <>
                  <p className='option-text remove'>Remove</p>
                  <RepostIcon />
                </>
              ) : (
                <>
                  <p className='option-text'>Repost</p>
                  <RepostIcon />
                </>
              )}
            </div>
            <div className='option'>
              <p className='option-text'>Quote</p>
              <QuoteIcon />
            </div>
          </div>
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