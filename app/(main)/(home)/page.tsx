import { getThreads } from '@/libs/actions/threads.actions'
import { getUser } from '@/libs/actions/user.actions'

import './style.scss'
import ThreadCard from '@/components/cards/thread/ThreadCard'

const HomePage = async () => {
  const result = await getThreads(1, 30)
  const user = await getUser()

  return (
    <section className='page home-page'>
      {result.threads.map(thread => (
        <ThreadCard 
          key={thread._id}
          id={thread._id}
          currentUserId={user._id}
          parentId={thread.parentId}
          content={thread.body}
          image={thread.image}
          author={thread.author}
          createdAt={thread.createdAt}
          comments={thread.children}
          likes={thread.likes.map((item: any) => item.toString())}
        />
      ))}
    </section>
  )
}

export default HomePage