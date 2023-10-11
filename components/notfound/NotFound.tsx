import Link from 'next/link'
import './notfound.scss'

const NotFound = () => {
  return (
    <div className='page not-found-component'>
      <h1 className='title'>This page is not aviable.</h1>
      <p className='text'>The link you followed may be incorrect or the page may have been deleted.</p>
      <Link className='btn' href='/'>Back</Link>
    </div>
  )
}

export default NotFound