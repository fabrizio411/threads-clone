import { getUser } from '@/libs/actions/user.actions'
import { getProfileReplies, getProfileThreads } from '@/libs/actions/threads.actions'

import ProfileHeader from '../../components/header/ProfileHeader'
import ProfileInfo from '../../components/info-section/ProfileInfo'
import ProfileDisplay from '../../components/threads/ProfileDisplay'
import ThreadsDisplay from '../../components/threads/sections/ThreadsDisplay'
import RepliesDisplay from '../../components/threads/sections/RepliesDisplay'
import RepostsDisplay from '../../components/threads/sections/RepostsDisplay'
import ThreadCard from '@/components/cards/thread/ThreadCard'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'

import '../profile/style.scss'
import { redirect } from 'next/navigation'
import NotFound from '@/components/notfound/NotFound'

const ProfileExtaPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params

  const getParamsUsername = () => {
    if (Array.isArray(username)) {
      return username[0].slice(3)
    }
    
    return username.slice(3)
  }

  const user = await getUser(getParamsUsername())
  if (!user) return <NotFound />
  
  const currentUser = await getUser()
  const threads = await getProfileThreads(user._id)
  const replies = await getProfileReplies(user._id)

  if (user._id === currentUser._id.toString()) redirect('/profile')

  const isFollowing = user.followers.includes(currentUser._id)
  const followCurrentUser = user.following.includes(currentUser._id)

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
            followRequests={user.followRequests.map((item: any) => item.toString())}
            followCurrentUser={followCurrentUser}
            variant='OTHER'
          />
        </>
      )}
      <ProfileDisplay isPrivate={user.isPrivate} isFollowing={isFollowing}>
        {user.isPrivate && !isFollowing ? (
          <p className='private-msg'>This profile is private.</p>
        ) : (
          <>
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
                    currentUserId={currentUser._id.toString()}
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
                      key={item.parentId._id.toString()}
                      _id={item.parentId._id.toString()}
                      body={item.parentId.body}
                      image={item.parentId.image}
                      author={item.parentId.author}
                      likes={item.parentId.likes.map((i: any) => i.toString())}
                      children={item.parentId.children}
                      createdAt={item.parentId.createdAt}
                      currentUserId={currentUser._id.toString()}
                      vairant='PARENT'
                    />
                    <ThreadCard 
                      key={item._id.toString()}
                      _id={item._id.toString()}
                      body={item.body}
                      image={item.image}
                      author={item.author}
                      likes={item.likes.map((item: any) => item.toString())}
                      children={item.children}
                      createdAt={item.createdAt}
                      currentUserId={currentUser._id.toString()}
                      vairant='CHILD'
                    />
                  </>
                )) : (
                  <p className='no-items-msg'>No replies yet</p>
                )
              )}
            </RepliesDisplay>

            <RepostsDisplay />
          </>
        )}
      </ProfileDisplay>
    </div>
  )
}

export default ProfileExtaPage