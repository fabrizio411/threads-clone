import Link from 'next/link'
import './confirmationmodal.scss'

interface ConfirmationModalProps {
  isActive: boolean,
  title?: string,
  body?: string,
  backText?: string,
  confirmText?: string,
  confirmPath?: string,
  closeModal: () => void,
  confirmFunction?: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, body, backText, confirmPath, confirmText, closeModal, isActive, confirmFunction }) => {
  let positionY = 0
  if (isActive) positionY = window.scrollY

  const thisStyles = {
    top: `${positionY}px`
  }

  if (isActive) {
    document.body.classList.add('block-scroll')
  }

  return (
    <div className={`confirmation-modal ${isActive && 'active'}`} style={thisStyles}>
      <div className='overlay' onClick={closeModal}></div>
      <div className='content'>

        <div className='text-box'>
          <p className='title'>{title || 'Are you shure?'}</p>
          {body && (
            <p className='body'>{body}</p>
          )}
        </div>

        <div className='modal-buttons'>
          {confirmPath && (
            <Link className='confirm btn' href={confirmPath}>{confirmText || 'Confirm'}</Link>
          )}
          {confirmFunction && (
            <div className='confirm btn' onClick={confirmFunction}>{confirmText || 'Confirm'}</div>
          )}
          <div className='cancel btn' onClick={closeModal}>{backText || 'Cancel'}</div>
        </div>

      </div>
    </div>
  )
}

export default ConfirmationModal