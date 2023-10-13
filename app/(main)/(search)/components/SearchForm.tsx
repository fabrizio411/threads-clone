'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import './searchform.scss'
import SearchIcon from '@/components/icons/nav-icons/SearchIcon'



const SearchForm = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <form className='search-form-component' onSubmit={handleSubmit(onSubmit)}>
      <label className='label' htmlFor='searchString'>
        <button type='submit' className='icon-box'>
          <SearchIcon />
        </button>
        <input className='input' type='text' id='searchString' placeholder='Search' {...register('searchString')}/>
      </label>
    </form>
  )
}

export default SearchForm