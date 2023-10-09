import './comments.scss'
import CreateForm from '@/app/(main)/(create)/components/CreateForm'

interface CommentsProps {
  id: string,
  image: string,
  username: string,
  isPrivate: boolean,
  parentId: string
}

const Comments: React.FC<CommentsProps> = ({ id, username, image, isPrivate, parentId }) => {

  return (
    <div className='comments-component'>
      <div className='reply-section'>
        <CreateForm userId={id} image={image} username={username} isPrivate={isPrivate} isComment parentId={parentId}/>
        {/* <Image className='image' alt='profile photo' src={image || '/images/placeholder.jpg'} height={50} width={50}/>
        <form className='form'>
          <input className='input' placeholder='Comment...' {...register('body')}/>

          <button className='submit-btn' type='submit' disabled={isDisabled}>Reply</button>
        </form> */}
      </div>
    </div>
  )
}

export default Comments