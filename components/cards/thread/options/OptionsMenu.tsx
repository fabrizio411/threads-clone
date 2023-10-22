'use client'

import { useState } from 'react'
import './optionsmenu.scss'
import ConfirmationModal from '@/components/modals/confirmation/ConfirmationModal'
import { deleteComment, deleteThread } from '@/libs/actions/threads.actions'
import { usePathname } from 'next/navigation'

interface OptionsMenuProps {
  threadsId: string,
  isComment?: boolean
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ threadsId, isComment }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)

  const handleMenu = () => {
    if (isOpen) setIsOpen(false)
    else setIsOpen(true)
  }

  const handleConfirm = async () => {
    if (isComment) {
      await deleteComment(threadsId, pathname)
    } else {
      await deleteThread(threadsId, pathname)
    }
    
    setIsDeleteModal(false)
    setIsOpen(false)
    document.body.classList.remove('block-scroll')
  }

  const handleDeleteModal = () => {
    if (pathname === '/profile') {
      handleConfirm()
    } else {
      if (isDeleteModal) setIsDeleteModal(false)
      else setIsDeleteModal(true)
      document.body.classList.remove('block-scroll')
    }
  }


  return (
    <>
      <div className='options-menu-component'>
        <svg className='svg-button' onClick={handleMenu} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'></path></svg>

        <div className={`options-menu ${isOpen && 'active'}`}>
          <p className='option'>Hide like count</p>
          <p className='option delete' onClick={handleDeleteModal}>Delete</p>
        </div>

      </div>


      {pathname !== '/profile' && (
        <ConfirmationModal 
          isActive={isDeleteModal}
          title='Delete this post?'
          confirmText='Delete'
          closeModal={handleDeleteModal}
          confirmFunction={handleConfirm}
        />
      )}
    </>
  )
}

export default OptionsMenu