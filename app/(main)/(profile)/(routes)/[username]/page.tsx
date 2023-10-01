import { getUser } from '@/libs/actions/user.actions'
import { useRouter } from 'next/router'
import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import ProfileDisplay from '../../components/threads/ProfileDisplay'

import '../profile/style.scss'
import ThreadsDisplay from '../../components/threads/sections/ThreadsDisplay'
import ThreadCard from '@/components/cards/thread/ThreadCard'
import RepliesDisplay from '../../components/threads/sections/RepliesDisplay'
import RepostsDisplay from '../../components/threads/sections/RepostsDisplay'
import { getProfileThreads } from '@/libs/actions/threads.actions'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'

const ProfileExtaPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params

  const getParamsUsername = () => {
    if (Array.isArray(username)) {
      return username[0].slice(3)
    }
    
    return username.slice(3)
  }

  const user = await getUser(getParamsUsername())
  const currentUser = await getUser()
  const threads = await getProfileThreads(user._id)

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
            currentUserId={currentUser._id.toString()}
            id={user._id.toString()}
            name={user.name}
            username={user.username}
            bio={user.bio}
            image={user.image}
            isPrivate={user.isPrivate}
            followers={user.followers.map((item: any) => item.toString())}
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
                key={item._id.toString()}
                id={item._id.toString()} 
                currentUserId={user._id.toString()}
                parentId={item.parentId}
                content={item.body}
                image={item.image}
                author={item.author}
                createdAt={item.createdAt}
                comments={item.children}
                isComment={item.children.length > 0}
                likes={item.likes.map((item: any) => item.toString())}
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