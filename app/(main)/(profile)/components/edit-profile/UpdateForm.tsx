'use client'

import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { UserUpdateValidation } from '@/libs/validations/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import StageOneForm from '@/app/(auth)/components/stage-forms/StageOneForm'

import './updateform.scss'
import { updateUser } from '@/libs/actions/user.actions'
import CloseIcon from '@/components/icons/CloseIcon'
import ConfirmationModal from '@/components/modals/confirmation/ConfirmationModal'

interface UpdateFormProps {
  name: string,
  username: string,
  bio: string,
  image: string,
  isPrivate: boolean,
  id: string
}

const UpdateForm: React.FC<UpdateFormProps> = ({ name, username, bio, image, isPrivate, id }) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isInputLoading, setIsInputLoading] = useState<boolean>(false)
  const [usernameAviable, setUsernameAviable] = useState<boolean>(true)
  const [isSwiped, setIsSwiped] = useState<boolean>(isPrivate)
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false)
  const [isCancelModal, setIsCancelModal] = useState<boolean>(false)

  const { watch, control, register, handleSubmit, formState: {errors, touchedFields}, setValue,  } = useForm<FieldValues>({
    resolver: zodResolver(UserUpdateValidation),
    defaultValues: {
      name,
      username,
      bio,
      image,
      isPrivate
    }
  })

  let position = 2
  if (isSwiped) position = 22
  else position = 2

  const keyStyles = {
    left: `${position}px`
  }

  const handleSwipe = () => {
    if (!isLoading) {
      if (isSwiped) {
        setIsSwiped(false)
        setValue('isPrivate', false)
      }
      else {
        setIsSwiped(true)
        setValue('isPrivate', true)
      }
    }
  }

  const handleCancel = () => {
    if (touchedFields.name || touchedFields.username || touchedFields.image || touchedFields.bio || touchedFields.isPrivate) {
      if (isCancelModal) setIsCancelModal(false)
      else setIsCancelModal(true)
    } else {
      router.push('/profile')
    }
  }

  const usernameValue = watch('username')
  const nameValue = watch('name')

  useEffect(() => {
    if (!nameValue || !usernameValue) setSubmitDisabled(true)
    else setSubmitDisabled(false)
  }, [nameValue, usernameValue])

  useEffect(() => {
    if (usernameValue.length > 2 && usernameValue !== username) {
      setIsInputLoading(true)
      axios.post('/api/checkdata', usernameValue)
      .then(() => setUsernameAviable(true))
      .catch((err: any) => {
        console.log('Validation Error', err)
        setUsernameAviable(false)
      })
      .finally(() => setIsInputLoading(false))
    }

    if (usernameValue.length === 0) {
      setUsernameAviable(true)
      setSubmitDisabled(true)
    } else setSubmitDisabled(false)

  }, [usernameValue])

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    await updateUser({
      userId: id,
      name: data.name,
      username: data.username,
      bio: data.bio,
      image: data.image,
      isPrivate: data.isPrivate
    })
    .then(() => router.push('/profile'))
    .catch((err) => console.log('Updating Error', err))
    .finally(() => setIsLoading(false))
  }

  return (
      <form className='update-form-component' onSubmit={handleSubmit(onSubmit)}>
        <div className='mobile-buttons'>
          <div className='title-box'>
            <div onClick={handleCancel}>
              <CloseIcon />
            </div>
            <h2 className='title'>Edit Profile</h2>
          </div>
          <button className='btn' type='submit' disabled={isLoading || submitDisabled || !usernameAviable}>Done</button>
        </div>

        <div className='form'>
          <StageOneForm register={register} errors={errors} isLoading={isLoading} watch={watch} validationError={!usernameAviable} inputLoading={isInputLoading} control={control} />
          <div className='private-option-box' onClick={handleSwipe}>
            <p className='text'>Private Profile</p>
            <div className={`swipe-checkbox ${isSwiped && 'active'}`}>
              <div className='key' style={keyStyles}></div>
            </div>
            <input hidden type='checkbox' {...register('isPrivate')} />
          </div>
        </div>

        <div className='buttons'>
          <div className='btn cancel' onClick={handleCancel}>Cancel</div>
          <button className='btn submit' type='submit' disabled={isLoading || submitDisabled || !usernameAviable}>Done</button>
        </div>

        <ConfirmationModal 
          isActive={isCancelModal}
          title='Unsaved Changes'
          body='You have unsaved changes. Are you shure you want yo discard changes?'
          backText='Continue Editing'
          confirmText='Discard Changes'
          confirmPath='/profile'
          closeModal={handleCancel}
        />
      </form>
  )
}

export default UpdateForm