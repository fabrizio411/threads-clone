'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'

import './authform.scss'
import Input from '@/components/inputs/Input'
import ThreadsIcon from '@/components/icons/ThreadsIcon'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  const [isValidData, setIsValidData] = useState(false)

  const toggleVariants = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    else setVariant('LOGIN')
  }, [variant])

  const { watch, register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  })

  const usernameValue = watch('username')
  const passwordValue = watch('password')

  useEffect(() => {
    if (usernameValue && passwordValue) {
      setIsValidData(true)
    } else setIsValidData(false)
  
    
  }, [usernameValue, passwordValue])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      // axios
    }

    if (variant === 'LOGIN') {
      // nextauth
    }
  }
  
  return (
    <section className='authform-component'>
      <h1 className='title'>
        {variant === 'LOGIN' ? 'Login' : 'Register'} on Threads
      </h1>

      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Input id='username' placeholder='Username' register={register} errors={errors} disabled={isLoading} required/>
        <Input id='password' type='password' placeholder='Password' register={register} errors={errors} disabled={isLoading} required/>
        <button className='btn' disabled={!isValidData || isLoading} >
          {isLoading ? (
            <LoadingSpinner height='24px' width='24px'/>
          ) : (
            <>
              {variant === 'LOGIN' ? 'Login' : 'Register'}
              <ThreadsIcon className={`icon ${isValidData && 'disabled'}`} height='24px' width='24px' />
            </>
          )}
        </button>
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