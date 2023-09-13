'use client'

import Input from '@/components/inputs/Input'
import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import './stageform.scss'
import { useEffect, useState } from 'react'

interface StageOneProps {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  isLoading: boolean,
  watch: UseFormWatch<FieldValues>
}

const StageOneForm: React.FC<StageOneProps> = ({ register, errors, isLoading, watch }) => {
  const [isNameValid, setIsNameValid] = useState(false)
  const [isUsernameValid, setIsUsernameValid] = useState(false)

  const nameValue = watch('name')
  const usernameValue = watch('username')

  useEffect(() => {
    if (nameValue) setIsNameValid(true)
    else setIsNameValid(false)

    if (usernameValue) setIsUsernameValid(true)
    else setIsUsernameValid(false)
  }, [nameValue, usernameValue])

  return (
    <div className='stage-form-one'>
      <Input inputClass='LABEL' autoComplete='off' id='name' type='text' placeholder='Full Name' register={register} errors={errors} disabled={isLoading} isValidData={isNameValid} required />
      <div className='hr-bar'></div>
      <Input inputClass='LABEL' autoComplete='off' id='username' type='text' placeholder='Username' register={register} errors={errors} disabled={isLoading} isValidData={isUsernameValid} required />
      <div className='hr-bar'></div>
      <Input inputClass='LABEL' autoComplete='off' id='bio' type='text' placeholder='Bio' register={register} errors={errors} disabled={isLoading} />
    </div>
  )
}

export default StageOneForm