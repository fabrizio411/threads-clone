'use client'

import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useState } from 'react'

import LockIcon from '@/components/icons/LockIcon'
import GlobeIcon from '@/components/icons/GlobeIcon'

import './stageform.scss'

interface StageOneProps {
  register: UseFormRegister<FieldValues>,
  isLoading: boolean,
  setValue: UseFormSetValue<FieldValues>,
}

const StageTwoFrom: React.FC<FieldValues> = ({ register, isLoading, setValue }) => {
  const [isPrivateValue, setIsPrivateValue] = useState<boolean>(false)

  return (
    <div className='stage-form-two'>
      <div className={`input-label ${!isPrivateValue && 'active'}`} onClick={() => {
        setIsPrivateValue(false)
        setValue('isPrivate', false)
      }}>
        <h4 className='input-title'>Public Profile</h4>
        <p className='input-text'>Anyone on Threads can see and share your content, and interact with it.</p>
        <GlobeIcon/>
      </div>

      <div className={`input-label ${isPrivateValue && 'active'}`} onClick={() => {
        setIsPrivateValue(true)
        setValue('isPrivate', true)
      }}>
        <h4 className='input-title'>Private Profile</h4>
        <p className='input-text'>Only aproved followers can see, share and interact with your content.</p>
        <LockIcon/>
      </div>
      <input hidden className='input' id='isPrivate' type='checkbox' {...register('isPrivate')} disabled={isLoading}/>
    </div>
  )
}

export default StageTwoFrom