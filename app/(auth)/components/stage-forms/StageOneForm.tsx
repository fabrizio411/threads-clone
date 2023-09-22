'use client'

import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import Input from '@/components/inputs/Input'
import './stageform.scss'

interface StageOneProps {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  isLoading: boolean,
  watch: UseFormWatch<FieldValues>
}

const StageOneForm: React.FC<StageOneProps> = ({ register, errors, isLoading, watch }) => {
  const [isNameValid, setIsNameValid] = useState<boolean>(false)
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
  const [imageURL, setImageURL] = useState<string>('/images/placeholder.jpg')

  const nameValue = watch('name')
  const usernameValue = watch('username')

  useEffect(() => {
    if (nameValue) setIsNameValid(true)
    else setIsNameValid(false)

    if (usernameValue) setIsUsernameValid(true)
    else setIsUsernameValid(false)
  }, [nameValue, usernameValue])

  return (
    <div className='stage-form-one-component'>
      <div className='image-upload-box'>
        <Image className='image' src={imageURL} alt='profile-pic' height={70} width={70}/>
        <input hidden {...register('image')} disabled={isLoading} value={imageURL}/>
        <div className='plus-box'>
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z'></path></svg>
        </div>
      </div>
      <div className='stage-form-one'>
        <Input inputClass='LABEL' autoComplete='off' id='name' type='text' placeholder='Full Name' register={register} errors={errors} disabled={isLoading} isValidData={isNameValid} required />
        <div className='hr-bar'></div>
        <Input inputClass='LABEL' autoComplete='off' id='username' type='text' placeholder='Username' register={register} errors={errors} disabled={isLoading} isValidData={isUsernameValid} required />
        <div className='hr-bar'></div>
        <Input inputClass='LABEL/TEXTAREA' autoComplete='off' id='bio' type='text' placeholder='Bio' register={register} errors={errors} disabled={isLoading} />
      </div>
    </div>
  )
}

export default StageOneForm