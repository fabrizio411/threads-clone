import ThreadCard from '@/components/cards/thread/ThreadCard'
import { getOneThread } from '@/libs/actions/threads.actions'
import { getUser } from '@/libs/actions/user.actions'

import './style.scss'
import CreateForm from '@/app/(main)/(create)/components/CreateForm'
import { ThreadType } from '@/libs/types'
import { formatDateString } from '@/libs/utils'

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

  return (
    <section className='page thread-page'>
      {!thread.author.isPrivate ? (
        <>
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
                createdAt={formatDateString(item.createdAt)}
                currentUserId={user._id}
                likes={item.likes}
                children={item.children}
              />
            ))}
          </div>
        </>
      ) : (
        <div>Not allowed</div>
      )}
    </section>
  )
}

export default ThreadPage