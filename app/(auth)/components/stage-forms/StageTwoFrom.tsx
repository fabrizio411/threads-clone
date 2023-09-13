'use client'

import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import './stageform.scss'
import { useEffect } from 'react'
import LockIcon from '@/components/icons/LockIcon'
import GlobeIcon from '@/components/icons/GlobeIcon'

interface StageOneProps {
  register: UseFormRegister<FieldValues>,
  isLoading: boolean,
  setValue: UseFormSetValue<FieldValues>,
  watch: UseFormWatch<FieldValues>
}

const StageTwoFrom: React.FC<FieldValues> = ({ register, isLoading, setValue, watch }) => {
  const isPrivateValue = watch('isPrivate')
  const isNotPrivateValue = watch('isNotPrivate')

  useEffect(() => {
    setValue('isPrivate', false)
  }, [])


  return (
    <div className='stage-form-two'>
      <label className={`input-label ${isNotPrivateValue && 'active'}`} htmlFor='isNotPrivate'>
        <h4 className='input-title'>Public Profile</h4>
        <p className='input-text'>Anyone on Threads can see and share your content, and interact with it.</p>
        <input hidden className='input' id='isNotPrivate' defaultChecked type='checkbox' {...register('isNotPrivate')} disabled={isLoading} onChange={(e) => {
          setValue('isNotPrivate', true)
          setValue('isPrivate', false)
        }}/>
        <GlobeIcon/>
      </label>

      <label className={`input-label ${isPrivateValue && 'active'}`} htmlFor='isPrivate'>
        <h4 className='input-title'>Private Profile</h4>
        <p className='input-text'>Only aproved followers can see, share and interact with your content.</p>
        <input hidden className='input' id='isPrivate' type='checkbox' {...register('isPrivate')} disabled={isLoading} onChange={(e) => {
          setValue('isPrivate', true)
          setValue('isNotPrivate', false)
        }}/>
        <LockIcon/>
      </label>
    </div>
  )
}

export default StageTwoFrom