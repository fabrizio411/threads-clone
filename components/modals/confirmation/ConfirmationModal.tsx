import Link from 'next/link'
import './confirmationmodal.scss'
import React, { SetStateAction } from 'react'

interface ConfirmationModalProps {
  isActive: boolean,
  title?: string,
  body?: string,
  backText?: string,
  confirmText?: string,
  confirmPath: string,
  closeModal: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, body, backText, confirmPath, confirmText, closeModal, isActive }) => {
  return (
    <div className={`confirmation-modal ${isActive && 'active'}`}>
      <div className='overlay' onClick={closeModal}></div>
      <div className='content'>

        <div className='text-box'>
          <p className='title'>{title || 'Are you shure?'}</p>
          {body && (
            <p className='body'>{body}</p>
          )}
        </div>

        <div className='modal-buttons'>
          <Link className='confirm btn' href={confirmPath}>{confirmText || 'Confirm'}</Link>
          <div className='cancel btn' onClick={closeModal}>{backText || 'Cancel'}</div>
        </div>

      </div>
    </div>
  )
}

export default ConfirmationModal