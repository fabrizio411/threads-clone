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

interface UpdateFormProps {
  name: string,
  username: string,
  bio: string,
  image: string,
  isPrivate: boolean
}

const UpdateForm: React.FC<UpdateFormProps> = ({ name, username, bio, image, isPrivate }) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isInputLoading, setIsInputLoading] = useState<boolean>(false)
  const [usernameAviable, setUsernameAviable] = useState<boolean>(true)
  const [isSwiped, setIsSwiped] = useState<boolean>(isPrivate)
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false)

  const { watch, control, register, handleSubmit, formState: {errors, touchedFields}, setValue } = useForm<FieldValues>({
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

  const usernameValue = watch('username')

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
          <button className='btn cancel'>Cancel</button>
          <button className='btn submit' type='submit' disabled={isLoading || submitDisabled || !usernameAviable}>Done</button>
        </div>
      </form>
  )
}

export default UpdateForm