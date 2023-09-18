'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'

import './authform.scss'
import Input from '@/components/inputs/Input'
import ThreadsIcon from '@/components/icons/ThreadsIcon'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'
import RegisterExtra from './RegisterExtra'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()

  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  const [isValidData, setIsValidData] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isEmailErrors, setIsEmailErrors] = useState(false)

  useEffect(() => {
    console.log(session?.status)
    if (session?.status === 'authenticated') {
      router.push('/home')
    }
  }, [session?.status, router])

  const toggleVariants = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    else setVariant('LOGIN')
  }, [variant])

  const { watch, register, handleSubmit, formState: {errors}, getValues, setValue } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    }
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')

  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    setIsValidEmail(emailPattern.test(emailValue))
    if (!isValidEmail) setIsEmailErrors(true)
    else setIsEmailErrors(false)
    if (!emailValue) setIsEmailErrors(false)

    if (isValidEmail && emailValue && passwordValue) {
      setIsValidData(true)
    } else setIsValidData(false)
  }, [emailValue, passwordValue])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsOpen(false)
    setIsLoading(true)

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', data))
      .catch(() => console.log('Register Error'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          console.log('Invalid Credentials')
        }

        if (callback?.ok && !callback?.error) {
          router.push('/home')
        }
      })
      .catch(() => console.log('Auth Error'))
      .finally(() => setIsLoading(false))
    }
  }

  const registerExtraInfo = (e: any) => {
    if (variant === 'REGISTER') {
      e.preventDefault()
      setIsOpen(true)
    }
  }
  
  return (
    <section className='authform-component'>
      <h1 className='title'>
        {variant === 'LOGIN' ? 'Login' : 'Register'} on Threads
      </h1>

      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Input inputClass='PLACEHOLDER' id='email' type='email' isEmailErrors={isEmailErrors}  placeholder='Email Address' register={register} errors={errors} disabled={isLoading} required/>
        <Input inputClass='PLACEHOLDER' id='password' type='password' placeholder='Password' register={register} errors={errors} disabled={isLoading} required/>
        <button className='btn' type={variant === 'LOGIN' ? 'submit' : 'button'} disabled={!isValidData || isLoading} onClick={(e) => registerExtraInfo(e)}>
          {isLoading ? (
            <LoadingSpinner height='24px' width='24px'/>
          ) : (
            <>
              {variant === 'LOGIN' ? 'Login' : 'Register'}
              <ThreadsIcon className={`icon ${isValidData && 'disabled'}`} height='24px' width='24px' />
            </>
          )}
        </button>
        {variant === 'REGISTER' && (
          <RegisterExtra className={isOpen ? 'active' : 'inactive'} setIsOpen={setIsOpen} register={register} errors={errors} isLoading={isLoading} setValue={setValue} watch={watch}/>
        )}
      </form>

      <p className='variants'>
        {variant === 'LOGIN' ? 'New in Threads?' : 'Already have an account?'}
        <button className='action' onClick={toggleVariants} disabled={isLoading}>
          {variant === 'LOGIN' ? 'Register' : 'Login'} 
        </button>
      </p>
    </section>
  )
}

export default AuthForm