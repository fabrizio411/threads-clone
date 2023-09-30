'use client'

import { getUser } from '@/libs/actions/user.actions'
import { useParams, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import ProfileDisplay from '../../components/threads/ProfileDisplay'

import '../profile/style.scss'
import ThreadsDisplay from '../../components/threads/sections/ThreadsDisplay'
import ThreadCard from '@/components/cards/thread/ThreadCard'
import RepliesDisplay from '../../components/threads/sections/RepliesDisplay'
import RepostsDisplay from '../../components/threads/sections/RepostsDisplay'
import { getProfileThreads } from '@/libs/actions/threads.actions'
import axios from 'axios'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'

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

  const [user, setUser] = useState<UserProps>()
  const [threads, setThreads] = useState<any>()

  useEffect(() => {
    axios.post('/api/threads', { username: getParamsUsername()})
    .then((res) => {
      setThreads(res.data.threads)
      setUser(res.data.user)
    })
    .catch((err) => console.log(err))
  }, [])

  if (user && user.isCurrentUser) router.push('/profile')

  return (
    <div className='page profile-page'>
      {!user ? (
        <div className='profile-loading'>
          <LoadingSpinner height='30px' width='30px' />
        </div>
      ) : (
        <>
          <ProfileHeader isPrivate={user.isPrivate} variant='OTHER'/>
          <ProfileInfo 
            id={user._id.toString()}
            name={user.name}
            username={user.username}
            bio={user.bio}
            image={user.image}
            isPrivate={user.isPrivate}
            variant='OTHER'
          />
        </>
      )}
      <ProfileDisplay>
        <ThreadsDisplay>
          {!threads ? (
            <div className='no-items-msg'>
              <LoadingSpinner height='30px' width='30px' />
            </div>
          ) : (
            threads.threads.length && user ? threads.threads.map((item: any) => (
              <ThreadCard 
                id={item._id.toString()} 
                currentUserId={user._id.toString()}
                parentId={item.parentId}
                content={item.body}
                image={item.image}
                author={item.author}
                createdAt={item.createdAt}
                comments={item.children}
                isComment={item.children.length > 0}
              />
            )) : (
              <p className='no-items-msg'>No threads yet</p>
            )
          )}
        </ThreadsDisplay>
        <RepliesDisplay />
        <RepostsDisplay />
      </ProfileDisplay>
    </div>
  )
}

export default ProfileExtaPage