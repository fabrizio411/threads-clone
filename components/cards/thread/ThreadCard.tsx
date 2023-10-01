import Image from 'next/image'
import './threadcard.scss'
import Link from 'next/link'
import OptionsMenu from './options/OptionsMenu'
import ActionsMenu from './actions/ActionsMenu'
import { formatDateString } from '@/libs/utils'

interface ThreadCardPops {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    image: string
    author: {
      username: string,
      image: string,
      _id: string
    },
    createdAt: string,
    comments: {
      author: {
        image: string
      }
    }[],
    isComment?: boolean,
    likes: string[]
}

const ThreadCard: React.FC<ThreadCardPops> = ({ id, currentUserId, parentId, content, image, author, createdAt, comments, isComment, likes }) => {

  const formatedTime = formatDateString(createdAt)

  const hasComments = comments.length > 0

  return (
    <article className='thread-card-component'>

      <div className='left-section'>
        <Link href={`/@${author.username}`} className='image-box'>
          <Image alt='profile photo' src={author.image || '/images/placeholder.jpg'} fill />
        </Link>
        {hasComments && (
          <div className='thread-bar'></div>
        )}
        {hasComments && (
          <div className='comments-imgs'>
            {comments.length > 1 ? (
              <div className='multiple-comments-box'>
                <Image className='img bottom' alt='profile photo' src={comments[0].author.image || '/images/placeholder.jpg'} height={20} width={20} />
                <Image className='img top' alt='profile photo' src={comments[1].author.image || '/images/placeholder.jpg'} height={20} width={20} />
              </div>
            ) : (
              <div className='single-comment-box'>
                <Image className='img' alt='profile photo' src={comments[0].author.image || '/images/placeholder.jpg'} height={20} width={20} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className='main-section'>
        <div className='thread-info'>
          <Link href={`/@${author.username}`} className='username'>@{author.username}</Link>
          <div className='options-box'>
            <p className='time-display'>{formatedTime}</p>
            {author._id === currentUserId.toString() && (
              <OptionsMenu threadsId={id.toString()} />
            )}
          </div>
        </div>
        <div className='content'>
          <p className='body'>{content}</p>
          {image && (
            <Image alt='attached image' style={{borderRadius: '10px', width: '250px', height: 'auto', marginTop: '10px'}} src={image} width={300} height={200} />
          )}
        </div>

        <ActionsMenu 
          authorUsername={author.username} 
          threadId={id.toString()}
          authorId={author._id.toString()}
          currentUserId={currentUserId.toString()}
          likes={likes}
        />

        <div className='interactions-info'>
          {hasComments && (
            <>
              <p className='replies interaction'>{comments.length} replies</p>
              <span>-</span>
            </>
          )}
          <p className='likes interaction'>{likes.length} likes</p>
        </div>

      </div>

    </article>
  )
}

export default ThreadCard