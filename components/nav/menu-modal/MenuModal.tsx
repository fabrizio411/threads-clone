'use client'

import Link from 'next/link'

import './menumodal.scss'
import { signOut } from 'next-auth/react'

interface MenuModalProps {
  isOpen: boolean
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen }) => {
  return (
    <div className={`menu-modal ${isOpen && 'active'}`}>
      <ul>
        <li><Link href='/settings' className='item border'>Settings</Link></li>
        <li><p onClick={() => signOut()} className='item'>Log Out</p></li>
      </ul>
    </div>
  )
}

export default MenuModal