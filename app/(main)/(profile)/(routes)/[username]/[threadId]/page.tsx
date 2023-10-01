import ThreadCard from "@/components/cards/thread/ThreadCard"
import { getOneThread } from "@/libs/actions/threads.actions"
import { getUser } from "@/libs/actions/user.actions"

import './style.scss'

const ThreadPage = async ({ params }: { params: { username: string, threadId: string } }) => {
  const { threadId } = params

  const getParamsThreadId = () => {
    if (Array.isArray(threadId)) {
      return threadId[0]
    }

    return threadId
  }

  const thread = await getOneThread(getParamsThreadId())
  const user = await getUser()

  return (
    <section className='page thread-page'>
      {!thread.author.isPrivate ? (
        <ThreadCard 
          id={thread._id.toString()}
          content={thread.body}
          image={thread.image}
          author={thread.author}
          likes={thread.likes.map((item: any) => item.toString())}
          comments={thread.children}
          createdAt={thread.createdAt}
          currentUserId={user._id.toString()}
          vairant='PAGE'
        />
      ) : (
        <div>Not allowed</div>
      )}
    </section>
  )
}

export default ThreadPage