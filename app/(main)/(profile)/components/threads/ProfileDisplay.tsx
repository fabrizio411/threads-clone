'use client'

import { useState } from 'react'
import './profiledisplay.scss'
import RepliesDisplay from './sections/RepliesDisplay'
import RepostsDisplay from './sections/RepostsDisplay'
import ThreadsDisplay from './sections/ThreadsDisplay'

const ProfileDisplay = () => {
  const [current, setCurrent] = useState<string>('THREADS')

  let borderPosition
  if (current === 'THREADS') borderPosition = 0
  if (current === 'REPLIES') borderPosition = 100 / 3
  if (current === 'REPOSTS') borderPosition = 100 / 3 * 2

  const borderStyles = {
    left: `${borderPosition}%`
  }

  let contentPosition
  if (current === 'THREADS') contentPosition = 0
  if (current === 'REPLIES') contentPosition = -100
  if (current === 'REPOSTS') contentPosition = -200

  const contentStyles = {
    left: `${contentPosition}%`
  }

  return (
    <section className='profile-display-component'>
      <div className='section-nav'>
        <p className={`section-title ${current === 'THREADS' && 'active'}`} onClick={() => setCurrent('THREADS')}>Threads</p>
        <p className={`section-title ${current === 'REPLIES' && 'active'}`} onClick={() => setCurrent('REPLIES')}>Replies</p>
        <p className={`section-title ${current === 'REPOSTS' && 'active'}`} onClick={() => setCurrent('REPOSTS')}>Reposts</p>
        <div className='border' style={borderStyles}></div>
      </div>
      <div className='content-display-box'>
        <div className='content' style={contentStyles}>
          <ThreadsDisplay/>
          <RepliesDisplay/>
          <RepostsDisplay/>
        </div>
      </div>
    </section>
  )
}

export default ProfileDisplay