'use client'

import { Controller, FieldErrors, FieldValues, UseFormRegister, UseFormWatch, Control } from 'react-hook-form'
import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'

import Input from '@/components/inputs/Input'
import './stageform.scss'

interface StageOneProps {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  isLoading: boolean,
  watch: UseFormWatch<FieldValues>,
  validationError: boolean,
  inputLoading: boolean,
  control: Control
}

const StageOneForm: React.FC<StageOneProps> = ({ register, errors, isLoading, watch, validationError, inputLoading, control }) => {
  const [isNameValid, setIsNameValid] = useState<boolean>(false)
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)

  const nameValue = watch('name')
  const usernameValue = watch('username')

  useEffect(() => {
    if (nameValue) setIsNameValid(true)
    else setIsNameValid(false)

    if (usernameValue) setIsUsernameValid(true)
    else setIsUsernameValid(false)
  }, [nameValue, usernameValue])

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''

        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <div className='stage-form-one-component'>
      <div className='image-upload-box'>

        <Controller 
          name='image' 
          control={control} 
          render={({ field }) => (
            <label htmlFor='image'>
              {field.value ? (
                <Image className='image' src={field.value} alt='Profile photo' height={80} width={80} priority/>
              ) : (
                <Image className='image' src='/images/placeholder.jpg' alt='Profile photo' height={80} width={80}/>
              )}
              <div className='plus-box'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z'></path></svg>
                <input className='image-input' hidden type='file' accept='image/*' id='image'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </div>
            </label>
          )}
        />

      </div>
      <div className='stage-form-one'>
        <Input inputClass='LABEL' autoComplete='off' id='name' type='text' placeholder='Full Name' register={register} errors={errors} disabled={isLoading} isValidData={isNameValid} required />
        <div className='hr-bar'></div>
        <Input inputClass='LABEL' validationError={validationError} inputLoading={inputLoading} autoComplete='off' id='username' type='text' placeholder='Username' register={register} errors={errors} disabled={isLoading} isValidData={isUsernameValid} required />
        <div className='hr-bar'></div>
        <Input inputClass='LABEL/TEXTAREA' autoComplete='off' id='bio' type='text' placeholder='Bio' register={register} errors={errors} disabled={isLoading} />
      </div>
    </div>
  )
}

export default StageOneForm