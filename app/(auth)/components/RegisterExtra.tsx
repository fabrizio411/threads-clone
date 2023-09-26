'use client'

import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch, Control } from 'react-hook-form'
import { useEffect, useState } from 'react'

import StageOneForm from './stage-forms/StageOneForm'
import StageTwoFrom from './stage-forms/StageTwoFrom'
import Arrow from '@/components/icons/Arrow'

import './registerextra.scss'

type Stage = 1 | 2
 
interface RegisterExtraProps {
  className: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  isLoading: boolean,
  setValue: UseFormSetValue<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  validationError: boolean,
  inputLoading: boolean,
  control: Control
}

const RegisterExtra: React.FC<RegisterExtraProps> = ({ className, setIsOpen, register, errors, isLoading, setValue, watch, validationError, inputLoading, control }) => {
  const [stage, setStage] = useState<Stage>(1)
  const [isValidData, setIsValidData] = useState(false)

  useEffect(() => {
    if (errors?.name || errors?.username || errors?.bio) setStage(1)
  }, [errors])

  const closeForm = () => {
    setIsOpen(false)
  }

  const nameValue = watch('name')
  const usernameValue = watch('username')

  useEffect(() => {
    if (nameValue && usernameValue && !validationError) {
      setIsValidData(true)
    } else setIsValidData(false)
  }, [nameValue, usernameValue, validationError])

  const handleBackStages = () => {
    if (!isLoading) {
      if (stage === 2) {
        setStage(1)
      }
  
      if (stage === 1) {
        setIsOpen(false)
      }
    }
  }

  const handleForwardStages = () => {
    if (isValidData) setStage(2)
  }

  return (
    <div className={`registerextra-component ${className}`}>
      <div className='overlay' onClick={closeForm}></div>
      <div className='content'>
        <div className='nav'>
          <div onClick={handleBackStages}>
            <Arrow />
          </div>
          {stage === 1 && (
            <div onClick={handleForwardStages}>
              <Arrow className={`arrow-fowrard ${!isValidData && 'disabled'}`} />
            </div>
          )}
        </div>

        <div className='title-box'>
          <h2 className='title'>
            {stage === 1 ? 'Profile' : 'Privacy'}
          </h2>
          <p className='text'>
            {stage === 1 ? 'Personalize your Threads profile.' : 'Select your account privacy settings.'}
          </p>
        </div>
        
        {stage === 1 ? (
          <div className='stage-box'>
            <StageOneForm control={control} register={register} watch={watch} errors={errors} isLoading={isLoading} validationError={validationError} inputLoading={inputLoading}/>
          </div>
        ) : (
          <div className='stage-box'>
          <StageTwoFrom register={register} isLoading={isLoading} setValue={setValue}/>
        </div>
        )}

        {stage === 1 ? (
          <button className={`extra-btn ${!isValidData && 'disabled'}`} type='button' onClick={(e) => {
            e.preventDefault()
            if (isValidData) setStage(2)
          }}>Continue</button>
        ) : (
          <button className='extra-btn' type='submit'>Register</button>
        )}
      </div>
    </div>
  )
}

export default RegisterExtra