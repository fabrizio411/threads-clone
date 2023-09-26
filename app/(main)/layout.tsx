import Nav from '@/components/nav/Nav'

import './layout.scss'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='main-layout'>
      <main className='main'>
        <Nav/>
        {children}
      </main>
    </div>
  )
}

export default MainLayout