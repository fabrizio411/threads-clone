import { formatDateString } from '@/libs/utils'
import { ThreadType } from '@/libs/types'
import Image from 'next/image'
import Link from 'next/link'

import OptionsMenu from './options/OptionsMenu'
import ActionsMenu from './actions/ActionsMenu'
import './threadcard.scss'

const ThreadCard: React.FC<ThreadType> = ({ _id, currentUserId, parentId, body, image, author, createdAt, children, likes, vairant, isReposted }) => {
  const formatedTime = formatDateString(createdAt)
  const hasComments = children.length > 0

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
              {children.length > 1 ? (
                <div className='multiple-comments-box'>
                  <Image className='img bottom' alt='profile photo' src={children[0].author.image || '/images/placeholder.jpg'} height={20} width={20} />
                  <Image className='img top' alt='profile photo' src={children[1].author.image || '/images/placeholder.jpg'} height={20} width={20} />
                </div>
              ) : (
                <div className='single-comment-box'>
                  <Image className='img' alt='profile photo' src={children[0].author.image || '/images/placeholder.jpg'} height={20} width={20} />
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
        </div>

        <ActionsMenu 
          authorUsername={author.username} 
          threadId={_id.toString()}
          authorId={author._id.toString()}
          currentUserId={currentUserId.toString()}
          likes={likes.map((item: any) => item.toString())}
          replies={children.length}
          hasComments={hasComments}
          isReposted={isReposted}
        />
        
      </div>

    </article>
  )
}

export default ThreadCard