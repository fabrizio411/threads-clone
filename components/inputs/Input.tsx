'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import './input.scss'
import LoadingSpinner from '../icons/spinner/LoadingSpinner'

interface InputProps {
  id: string,
  type?: string,
  placeholder?: string,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  isEmailErrors?: boolean
  disabled?: boolean,
  required?: boolean,
  isValidData?: boolean,
  inputClass: string, // PLACEHOLDER | LABEL
  autoComplete?: string,
  validationError?: boolean,
  inputLoading?: boolean
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  register,
  errors,
  isEmailErrors,
  disabled,
  required,
  isValidData,
  inputClass,
  autoComplete,
  validationError,
  inputLoading
}) => {

  return (
    <div className='input-component-container'>
      {inputClass === 'PLACEHOLDER' && (
        <input 
          className={`input-component placeholder ${isEmailErrors && 'error'} ${errors[id] && 'error'}`} 
          id={id}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          {...register(id, { required })}
          autoComplete={autoComplete}
        />
      )}

      {inputClass === 'LABEL' && (
        <div className={`input-component label ${errors[id] && 'error'}`}>
          <label className='label' htmlFor={id}>
            {placeholder}
            {errors[id] && (
              <p className='error-msg'>{errors[id]?.message as string}</p>
            )}
            {validationError && (
              <p className='error-msg'>{`${id} is not aviable`}</p>
            )}
          </label>
          <input
            className='input' 
            id={id}
            disabled={disabled}
            type={type}
            placeholder={`+ write ${id}`}
            {...register(id, { required })}
            autoComplete={autoComplete}
          />
          {required && !isValidData && (
            <div className='required-dot'></div>
          )}
        </div>
      )}

      {inputClass === 'LABEL/TEXTAREA' && (
        <div className={`input-component label ${errors[id] && 'error'}`}>
          <label className='label' htmlFor={id}>
            {placeholder}
            {errors[id] && (
              <p className='error-msg'>{errors[id]?.message as string}</p>
            )}
          </label>
          <textarea
            className='input textarea' 
            id={id}
            disabled={disabled}
            placeholder={`+ write ${id}`}
            {...register(id, { required })}
            autoComplete={autoComplete}
          />
          {required && !isValidData && (
            <div className='required-dot'></div>
          )}
        </div>
      )}

      {inputLoading && (
        <div className='input-loading-box'>
          <LoadingSpinner height='24px' width='24px' />
        </div>
      )}
    </div>

  )
}

export default Input