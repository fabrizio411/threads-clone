'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import './input.scss'

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
  autoComplete?: string
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
  autoComplete
}) => {

  return (
    <>
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
          <label className='label' htmlFor={id}>{placeholder}</label>
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
    </>

  )
}

export default Input