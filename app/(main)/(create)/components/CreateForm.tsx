'use client'

import CloseIcon from '@/components/icons/CloseIcon'
import './createform.scss'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ThreadsValidation } from '@/libs/validations/threads'
import { isBase64Image } from '@/libs/utils'
import { usePathname, useRouter } from 'next/navigation'
import ConfirmationModal from '@/components/modals/confirmation/ConfirmationModal'
import { createThread } from '@/libs/actions/threads.actions'

interface CreateFormProps {
  username: string,
  image: string,
  isPrivate: boolean,
  userId: string
}

const CreateForm: React.FC<CreateFormProps> = ({ username, image, isPrivate, userId }) => {
  const pathname = usePathname()
  const router = useRouter()
  const textareaRef: any = useRef(null)
  const maxCharacters = 500
  const [textareaVal, setTextareaVal] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCancelModal, setIsCancelModal] = useState<boolean>(false)
  const [imageError, setImageError] = useState<string>('')

  const { register, control, watch, formState: {errors}, setValue, handleSubmit } = useForm<FieldValues>({
    resolver: zodResolver(ThreadsValidation),
    defaultValues: {
      body: '',
      image: '',
      userId
    }
  })

  const handleChange = (e: any) => {
    if (e.target.value.length > maxCharacters) {
      e.target.value = textareaVal
    }
    setTextareaVal(e.target.value)
  }

  useEffect(() => {
    if (textareaRef.current.scrollHeight < 400) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    } else textareaRef.current.style.overflowY = 'scroll'
    setValue('body', textareaVal)
  }, [textareaVal])

  const imageValue = watch('image')
  const bodyValue = watch('body')

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

  const handleCancel = () => {
    if (bodyValue || imageValue) {
      if (isCancelModal) setIsCancelModal(false)
      else setIsCancelModal(true)
    } else {
      router.push('/')
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await createThread({
      userId: userId,
      body: data.body,
      image: data.image,
      path: pathname
    })

    router.push('/')
  }

  return (
    <form className='create-form-component' onSubmit={handleSubmit(onSubmit)}>

      <div className='title-box'>
        <div className='title-box'>
          <div onClick={handleCancel}>
            <CloseIcon />
          </div>
          <p className='title'>New Thread</p>
        </div>
      </div>

      <div className='form-display'>
        <div className='image-box'>
          <Image alt='profile photo' src={image || '/images/placeholder.jpg'} fill/>
        </div>
        <div className='input-box'>
          <p className='username'>@{username}</p>
          <textarea autoFocus className='textarea' disabled={isLoading} rows={1} placeholder='Start a thread...' onChange={(e) => handleChange(e)} ref={textareaRef}/>
          <input hidden {...register('body')}/>
          <div className='extra-box'>

            <Controller 
              name='image' 
              control={control} 
              render={({ field }) => (
                <div className='file-input-box'>
                  {field.value && (
                    <div className='file-box'>
                      {imageError && (
                        <p className='error-msg'>{imageError}</p>
                      )}
                      <Image alt='uploaded file' style={{borderRadius: '15px', width: '250px', height: 'auto'}} src={field.value} width={300} height={200} />
                      <div className='close-btn' onClick={() => {setValue('image', '')}}>
                        <CloseIcon />
                      </div>
                    </div>
                  )}
                  <label htmlFor='image'>
                    <svg  height='20' role='img' viewBox='0 0 20 20' width='20'><path d='M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z' fill='currentColor'></path></svg>
                  </label>
                  <input hidden type='file' id='image' accept='image/*' onChange={(e) => handleImage(e, field.onChange)}/>
                </div>
              )}
            />
 
            <p className='char-control'>{textareaVal.length}/{maxCharacters} characters</p>
          </div>
        </div>

        <div className='desktop-buttons'>
          <p className='text'>{isPrivate ? 'Only your followers can reply' : 'Everyone can reply'}</p>
          <button className='btn' disabled={isLoading || !textareaVal}>Post</button>
        </div>
      </div>

      <div className='buttons'>
        <p className='text'>{isPrivate ? 'Only your followers can reply' : 'Everyone can reply'}</p>
        <button className='btn' disabled={isLoading || !textareaVal}>Post</button>
      </div>
      
      <ConfirmationModal 
        isActive={isCancelModal}
        title='Discard thread?'
        backText='Cancel'
        confirmText='Discard'
        closeModal={handleCancel}
        confirmPath='/'
      />
    </form>
  )
}

export default CreateForm