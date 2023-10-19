import './quotemodal.scss'
import CreateForm from '@/app/(main)/(create)/components/CreateForm'

interface QuoteModalProps {
  userId: string,
  username: string,
  userImage: string,
  handleCloseModal: () => void,
  authorUsername: string,
  authorImage: string,
  threadBody: string,
  threadImage?: string
}

const QuoteModal: React.FC<QuoteModalProps> = ({ userId, username, userImage, handleCloseModal, authorImage, authorUsername, threadBody, threadImage }) => {
  return (
    <div className='quote-modal-component'>
      <div className='overlay' onClick={handleCloseModal}></div>
      <div className='content'>
        <CreateForm 
          userId={userId} 
          username={username} 
          image={userImage} 
          quoteThread={{
            authorImage,
            authorUsername,
            threadBody,
            threadImage,
          }}
        />
      </div>
    </div>
  )
}

export default QuoteModal