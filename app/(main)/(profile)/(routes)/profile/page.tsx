import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import './style.scss'
import { getUser } from '@/libs/actions/user.actions'
import ProfileDisplay from '../../components/threads/ProfileDisplay'
import ThreadsDisplay from '../../components/threads/sections/ThreadsDisplay'
import RepostsDisplay from '../../components/threads/sections/RepostsDisplay'
import RepliesDisplay from '../../components/threads/sections/RepliesDisplay'
import { getProfileThreads } from '@/libs/actions/threads.actions'
import ThreadCard from '@/components/cards/thread/ThreadCard'
import { Children } from 'react'

const ProfilePage = async () => {
  const user = await getUser()
  const threads = await getProfileThreads(user._id)

  return (
    <div className='page profile-page'>
      <ProfileHeader isPrivate={user.isPrivate} variant='SELF'/>
      <ProfileInfo 
        id={user._id.toString()}
        name={user.name}
        username={user.username}
        bio={user.bio}
        image={user.image}
        isPrivate={user.isPrivate}
      />
      <ProfileDisplay>
        <ThreadsDisplay>
          {threads.threads.map(item => (
            <ThreadCard 
              id={item._id.toString()} 
              currentUserId={user._id.toString()}
              parentId={item.parentId}
              content={item.body}
              image={item.image}
              author={item.userId}
              createdAt={item.createdAt}
              comments={item.children}
              isComment={item.children.length > 0}
            />
          ))}
        </ThreadsDisplay>
        <RepliesDisplay />
        <RepostsDisplay />
      </ProfileDisplay>
    </div>
  )
}

export default ProfilePage