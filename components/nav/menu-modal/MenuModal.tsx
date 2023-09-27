'use client'

import Link from 'next/link'

import './menumodal.scss'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

interface MenuModalProps {
  isOpen: boolean
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen }) => {
  const pathname = usePathname() 

  return (
    <div className={`menu-modal ${isOpen && 'active'}`}>
      <ul>
        <li className='border'><Link href='/settings' className='item'>Settings</Link></li>
        {pathname === '/profile' && (
          <li className='border'><Link href='/profile/edit' className='item'>Edit Profile</Link></li>
        )}
        <li><p onClick={() => {
          signOut()
        }} className='item'>Log Out</p></li>
      </ul>
    </div>
  )
}

export default MenuModal