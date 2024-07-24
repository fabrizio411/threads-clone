'use client'

import { useState, useEffect } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRegisterValidation, UserLoginrValidation } from '@/libs/validations/user'
import axios from 'axios'
import Link from 'next/link'

import Input from '@/components/inputs/Input'
import RegisterExtra from './RegisterExtra'
import ThreadsIcon from '@/components/icons/ThreadsIcon'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'

import './authform.scss'

interface AuthFormProps {
  variant: string,
}

const AuthForm: React.FC<AuthFormProps> = ({ variant }) => {
  const session = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loginErrors, setLoginErrors] = useState<string>('')
  const [isValidData, setIsValidData] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)
  const [isEmailErrors, setIsEmailErrors] = useState<boolean>(false)
  const [isInputLoading, setIsInputLoading] = useState<boolean>(false)
  const [usernameAviable, setUsernameAviable] = useState<boolean>(true)
  const [emailAviable, setEmailAviable] = useState<boolean>(true)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])

  let hrefURL
  let userValidation
  if (variant === 'REGISTER') {
    userValidation = zodResolver(UserRegisterValidation)
    hrefURL = '/login'
  }
  else {
    userValidation = zodResolver(UserLoginrValidation)
    hrefURL = '/register'
  }

  const { watch, control,  register, handleSubmit, formState: {errors}, setValue } = useForm<FieldValues>({
    resolver: userValidation,
    defaultValues: {
      email: '',
      password: '',
      name: '',
      username: '',
      bio: '',
      image: '',
    }
  })

  useEffect(() => {
    if (errors?.email || errors?.password) {
      setIsOpen(false)
    }
  }, [errors])

  const emailValue = watch('email')
  const usernameValue = watch ('username')
  const passwordValue = watch('password')

  useEffect(() => {
    if (isValidEmail && emailValue && variant === 'REGISTER') {
      setIsInputLoading(true)
      axios.post('/api/checkdata', emailValue)
      .then(() => setEmailAviable(true))
      .catch((err: any) => {
        console.log('Validation Error', err)
        setEmailAviable(false)
      })
      .finally(() => setIsInputLoading(false))
    }
    
    if (emailValue.length === 0) setEmailAviable(true)
  }, [emailValue, variant])

  useEffect(() => {
    if (usernameValue.length > 2 && variant === 'REGISTER') {
      setIsInputLoading(true)
      axios.post('/api/checkdata', usernameValue)
      .then(() => setUsernameAviable(true))
      .catch((err: any) => {
        console.log('Validation Error', err)
        setUsernameAviable(false)
      })
      .finally(() => setIsInputLoading(false))
    }

    if (usernameValue.length === 0) setUsernameAviable(true)
  }, [usernameValue, variant])

  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    setIsValidEmail(emailPattern.test(emailValue))
    if (!isValidEmail) setIsEmailErrors(true)
    else setIsEmailErrors(false)
    if (!emailValue) setIsEmailErrors(false)

    if (isValidEmail && emailValue && passwordValue && emailAviable && !isInputLoading) {
      setIsValidData(true)
    } else setIsValidData(false)
  }, [emailValue, passwordValue, emailAviable, isInputLoading, isValidEmail, isValidEmail])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsOpen(false)
    setIsLoading(true)

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(async () => signIn('credentials', data))
      .catch((err: any) => console.log('Register Error', err))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          setLoginErrors('Incorrect email or password')
        }

        if (callback?.ok && !callback?.error) {
          router.push('/home')
        }
      })
      .catch(() => setLoginErrors('Authentication Error'))
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

      {variant === 'LOGIN' && (
        <div className='variants'>
          <p>DEMO</p>
          <p>Mail: demo@mail.com</p>
          <p>Password: password</p>
        </div>
      )}

      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Input inputClass='PLACEHOLDER' id='email' type='email' isEmailErrors={isEmailErrors} inputLoading={isInputLoading} placeholder='Email Address' register={register} errors={errors} disabled={isLoading} required/>
        {!emailAviable && variant === 'REGISTER' && (
          <p className='error-msg'>Email is not aviable</p>
        )}
        {errors?.email && (
          <p className='error-msg'>{errors.email.message as string}</p>
        )}
        <Input inputClass='PLACEHOLDER' id='password' type='password' placeholder='Password' register={register} errors={errors} disabled={isLoading} required/>
        {errors?.password && (
          <p className='error-msg'>{errors.password.message as string}</p>
        )}
        {loginErrors && variant === 'LOGIN' && (
          <p className='error-msg'>{loginErrors}</p>
        )}
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
          <RegisterExtra className={isOpen ? 'active' : 'inactive'} setIsOpen={setIsOpen} control={control} register={register} errors={errors} isLoading={isLoading} setValue={setValue} watch={watch} inputLoading={isInputLoading} validationError={!usernameAviable}/>
        )}
      </form>

      <p className='variants'>
        {variant === 'LOGIN' ? 'New in Threads?' : 'Already have an account?'}
        <Link className='action' href={hrefURL}>
          {variant === 'LOGIN' ? 'Register' : 'Login'} 
        </Link>
      </p>
    </section>
  )
}

export default AuthForm