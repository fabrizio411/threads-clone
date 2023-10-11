import ThreadCard from '@/components/cards/thread/ThreadCard'
import { getOneThread } from '@/libs/actions/threads.actions'
import { getUser } from '@/libs/actions/user.actions'

import './style.scss'
import CreateForm from '@/app/(main)/(create)/components/CreateForm'
import { ThreadType } from '@/libs/types'

const ThreadPage = async ({ params }: { params: { username: string, threadId: string } }) => {
  const { threadId } = params

  const getParamsThreadId = () => {
    if (Array.isArray(threadId)) {
      return threadId[0]
    }

    return threadId
  }

  const threadIdFormated = getParamsThreadId()

  const thread = await getOneThread(threadIdFormated)
  const user = await getUser()

  const parentThread = await getOneThread(thread.parentId)

  const isFollowing = user.following.includes(thread.author._id)

  return (
    <section className='page thread-page'>
      {!thread.author.isPrivate || isFollowing ? (
        <>
          {parentThread && (
            <ThreadCard 
              _id={parentThread._id.toString()}
              body={parentThread.body}
              image={parentThread.image}
              author={parentThread.author}
              likes={parentThread.likes.map((item: any) => item.toString())}
              children={parentThread.children}
              createdAt={parentThread.createdAt}
              currentUserId={user._id.toString()}
              vairant='PARENT PAGE'
            />
          )}
          <ThreadCard 
            _id={thread._id.toString()}
            body={thread.body}
            image={thread.image}
            author={thread.author}
            likes={thread.likes.map((item: any) => item.toString())}
            children={thread.children}
            createdAt={thread.createdAt}
            currentUserId={user._id.toString()}
            vairant='PAGE'
          />
          <div className='form-container'>
            <CreateForm 
              userId={user._id.toString()} 
              image={user.image} 
              username={user.username} 
              isPrivate={user.isPrivate} 
              isComment 
              parentId={threadIdFormated}
              parentAuthor={thread.author._id.toString()}
            />
          </div>

          <div className='comments-section'>
            {thread.children.map((item: ThreadType) => (
              <ThreadCard 
                key={item._id.toString()}
                _id={item._id.toString()}
                body={item.body}
                image={item.image}
                author={item.author}
                parentId={item.parentId}
                createdAt={item.createdAt}
                currentUserId={user._id}
                likes={item.likes}
                children={item.children}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className='not-allowed-msg'>This profile is private.</h1>
          <p className='not-allowed-msg subtitle'>You are not allowed to see this thread.</p>
        </>
      )}
    </section>
  )
}

export default ThreadPage