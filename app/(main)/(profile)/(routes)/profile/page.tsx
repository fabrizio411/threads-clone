import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import './style.scss'
import { getUser } from '@/libs/actions/user.actions'
import ProfileDisplay from '../../components/threads/ProfileDisplay'
import ThreadsDisplay from '../../components/threads/sections/ThreadsDisplay'
import RepostsDisplay from '../../components/threads/sections/RepostsDisplay'
import RepliesDisplay from '../../components/threads/sections/RepliesDisplay'
import { getProfileReplies, getProfileThreads } from '@/libs/actions/threads.actions'
import ThreadCard from '@/components/cards/thread/ThreadCard'
import { Children } from 'react'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'

const ProfilePage = async () => {
  const user = await getUser()
  const threads = await getProfileThreads(user._id)
  const replies = await getProfileReplies(user._id)

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
            currentUserId={user._id.toString()}
            id={user._id.toString()}
            name={user.name}
            username={user.username}
            bio={user.bio}
            image={user.image}
            isPrivate={user.isPrivate}
            followers={user.followers.map((item: any) => item.toString())}
            followRequests={user.followRequests.map((item: any) => item.toString())}
          />
        </>
      )}
      <ProfileDisplay isPrivate={false}>
        <ThreadsDisplay>
          {!threads ? (
            <div className='no-items-msg'>
              <LoadingSpinner height='30px' width='30px' />
            </div>
          ) : (
            threads.threads.length && user ? threads.threads.map((item: any) => (
              <ThreadCard 
                key={item._id.toString()}
                _id={item._id.toString()} 
                currentUserId={user._id.toString()}
                parentId={item.parentId}
                body={item.body}
                image={item.image}
                author={item.author}
                createdAt={item.createdAt}
                children={item.children}
                likes={item.likes.map((item: any) => item.toString())}
              />
            )) : (
              <p className='no-items-msg'>No threads yet</p>
            )
          )}
        </ThreadsDisplay>

        <RepliesDisplay>
          {!replies ? (
            <div className='no-items-msg'>
              <LoadingSpinner height='30px' width='30px' />
            </div>
          ) : (
            replies.replies.length && user ? replies.replies.map((item: any) => (
              <>
                <ThreadCard 
                  _id={item.parentId._id.toString()}
                  body={item.parentId.body}
                  image={item.parentId.image}
                  author={item.parentId.author}
                  likes={item.parentId.likes.map((i: any) => i.toString())}
                  children={item.parentId.children}
                  createdAt={item.parentId.createdAt}
                  currentUserId={user._id.toString()}
                  vairant='PARENT'
                />
                <ThreadCard 
                  _id={item._id.toString()}
                  body={item.body}
                  image={item.image}
                  author={item.author}
                  likes={item.likes.map((item: any) => item.toString())}
                  children={item.children}
                  createdAt={item.createdAt}
                  currentUserId={user._id.toString()}
                  vairant='CHILD'
                />
              </>
            )) : (
              <p className='no-items-msg'>No replies yet</p>
            )
          )}
        </RepliesDisplay>

        <RepostsDisplay />
      </ProfileDisplay>
    </div>
  )
}

export default ProfilePage