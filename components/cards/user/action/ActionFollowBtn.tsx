'use client'

import { followPrivateUser, followUser } from "@/libs/actions/user.actions"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

interface ActionFollowBtnProps {
  isFollowing: boolean,
  isPending: boolean,
  followCurrentUser: boolean,
  isPrivate: boolean,
  currentUserId: string,
  id: string
}

const ActionFollowBtn: React.FC<ActionFollowBtnProps> = ({ currentUserId, id, isPrivate, isFollowing, isPending, followCurrentUser }) => {
  const pathname = usePathname()
  const [isFollowingState, setIsFollowing] = useState<boolean>(isFollowing)
  const [isPendingState, setIsPending] = useState<boolean>(isPending)

  const handleFollow = async () => {
    if (isPrivate) {
      if (isPendingState) {
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
      if (isFollowingState) {
        setIsFollowing(false)
        await followUser({
          isFollow: false,
          currentUserId: currentUserId,
          userToFollowId: id,
          path: pathname
        })
      }
      else {
        setIsFollowing(true)
        await followUser({
          isFollow: true,
          currentUserId: currentUserId,
          userToFollowId: id,
          path: pathname
        })
      }
    }
  }

  return (
    <button className={`btn ${!isFollowingState && 'follow'} ${isPendingState && 'pending'}`} onClick={(e) => {
      e.preventDefault()
      handleFollow()
    }}>
      {isPendingState ? 'Pending' : isFollowingState ? 'Following' : followCurrentUser ? 'Follow Back' : 'Follow'}
    </button>
  )
}

export default ActionFollowBtn