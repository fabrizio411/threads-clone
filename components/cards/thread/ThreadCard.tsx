import { formatDateString } from '@/libs/utils'
import { ThreadType } from '@/libs/types'
import Image from 'next/image'
import Link from 'next/link'

import OptionsMenu from './options/OptionsMenu'
import ActionsMenu from './actions/ActionsMenu'
import './threadcard.scss'
import QuoteThreadCard from '../quote/QuoteThreadCard'

const ThreadCard: React.FC<ThreadType> = ({ _id, currentUserId, currentUserUsername, currentUserImage, parentId, body, image, author, createdAt, childrenComments, likes, vairant, isReposted, quote }) => {
  const formatedTime = formatDateString(createdAt)
  const hasComments = childrenComments.length > 0

  let isComment = false
  if (parentId) isComment = true

  return (
    <article className={`thread-card-component ${(vairant === 'PARENT' || vairant === 'PARENT PAGE') && 'parent'}`}>

      {vairant !== 'PAGE' && (
        <div className='left-section'>
          <Link href={`/@${author.username}`} className={`image-box ${vairant === 'PARENT PAGE' && 'parent'}`}>
            <Image alt='profile photo' src={author.image || '/images/placeholder.jpg'} fill />
          </Link>
          {hasComments && (
            <div className={`thread-bar ${(vairant === 'PARENT' || vairant === 'PARENT PAGE') && 'full-bar'} ${vairant === 'PARENT' && 'profile-version'}`}></div>
          )}
          {hasComments && vairant !== 'PARENT' && vairant !== 'PARENT PAGE' && (
            <div className='comments-imgs'>
              {childrenComments.length > 1 ? (
                <div className='multiple-comments-box'>
                  <Image className='img bottom' alt='profile photo' src={childrenComments[0].author.image || '/images/placeholder.jpg'} height={20} width={20} />
                  <Image className='img top' alt='profile photo' src={childrenComments[1].author.image || '/images/placeholder.jpg'} height={20} width={20} />
                </div>
              ) : (
                <div className='single-comment-box'>
                  <Image className='img' alt='profile photo' src={childrenComments[0].author.image || '/images/placeholder.jpg'} height={20} width={20} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className='main-section'>
        <div className={`thread-info ${vairant === 'PAGE' && 'page-class'}`}>
          <div className='user-box'>
            {vairant === 'PAGE' && (
              <Link href={`/@${author.username}`} className='image-box'>
                <Image alt='profile photo' src={author.image || '/images/placeholder.jpg'} fill />
              </Link>
            )}
            <Link href={`/@${author.username}`} className='username'>@{author.username}</Link>
          </div>
          <div className='options-box'>
            <p className='time-display'>{formatedTime}</p>
            {author._id.toString() === currentUserId.toString() && (
              <OptionsMenu threadsId={_id.toString()} isComment={isComment}/>
            )}
          </div>
        </div>
        <div className='content'>
          <p className='body'>{body}</p>
          {image && (
            <Image alt='attached image' style={{borderRadius: '10px', width: '250px', height: 'auto', marginTop: '10px'}} src={image} width={300} height={200} />
          )}

          {quote && (
            <QuoteThreadCard 
              authorImage={quote.author.image}
              authorUsername={quote.author.username}
              threadBody={quote.body}
              threadImage={quote.image}
              threadId={quote._id.toString()}
            />
          )}
        </div>

        <ActionsMenu 
          authorUsername={author.username} 
          authorImage={author.image}
          threadBody={body}
          threadImage={image}
          threadId={_id.toString()}
          authorId={author._id.toString()}
          isAuthorPrivate={author.isPrivate}
          currentUserId={currentUserId.toString()}
          currentUserUsername={currentUserUsername}
          currentUserImage={currentUserImage}
          likes={likes.map((item: any) => item.toString())}
          replies={childrenComments.length}
          hasComments={hasComments}
          isReposted={isReposted}
        />
        
      </div>

    </article>
  )
}

export default ThreadCard