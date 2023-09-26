import Image from 'next/image'
import './imagemodal.scss'
import React from 'react'
import CloseIcon from '@/components/icons/CloseIcon'

interface ImageModalProps {
    image: string,
    handleOpenModal: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ image, handleOpenModal }) => {
  return (
    <div className='image-modal'>
      <div className='overlay' onClick={handleOpenModal}></div>
      <div className='content'>
        <Image alt='profile image' src={image || '/images/placeholder.jpg'} fill />
      </div>
      <div className='close-btn' onClick={handleOpenModal}>
        <CloseIcon />
      </div>
    </div>
  )
}

export default ImageModal