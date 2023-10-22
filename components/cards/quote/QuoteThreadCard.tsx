'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import './quotethreadcard.scss'
import { useRouter } from 'next/navigation'

interface QuoteThreadCardProps {
  authorImage: string,
  authorUsername: string,
  threadId: string,
  threadBody: string,
  threadImage?: string
}

const QuoteThreadCard: React.FC<QuoteThreadCardProps> = ({ authorImage, authorUsername, threadImage, threadBody, threadId }) => {
  const router = useRouter()

  const handleThreadClick = () => {
    router.push(`/@${authorUsername}/${threadId}`)
  }

  return (
    <article className='quote-thread-display' onClick={handleThreadClick}>
      <div className='user-info'>
        <Image className='image' alt='profile photo' src={authorImage || '/images/placeholder.jpg'} width={40} height={40}/>
        <Link href={`/@${authorUsername}`} className='username'>@{authorUsername}</Link>
      </div>
      <p className='thread-body'>{threadBody}</p>
      {threadImage && (
        <Image className='thread-image' style={{borderRadius: '10px', width: '250px', height: 'auto', marginTop: '10px'}} alt='image' src={threadImage} width={300} height={200} />
      )}
    </article>
  )
}

export default QuoteThreadCard