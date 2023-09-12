'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import './input.scss'

interface InputProps {
  id: string,
  type?: string,
  placeholder?: string,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  disabled?: boolean,
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  register,
  errors,
  disabled,
  required
}) => {

  return (
    <input 
      className={`input-component ${errors[id] && 'error'}`} 
      id={id}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      {...register(id, { required })}
    />
  )
}

export default Input