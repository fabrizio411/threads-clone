'use client'

import { useState } from 'react'
import useNavRoutes from '@/hooks/nav/useNavRoutes'

import NavItem from './NavItem'
import ThreadsIcon from '../icons/ThreadsIcon'
import MenuIcon from '../icons/nav-icons/MenuIcon'
import Link from 'next/link'

import './nav.scss'
import MenuModal from './menu-modal/MenuModal'

const Nav = () => {
  const routes = useNavRoutes()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    if (isMenuOpen) setIsMenuOpen(false)
    else setIsMenuOpen(true)
  }

  return (
    <header className='nav-component'>
      <Link href='/' className='desktop logo'>
        <ThreadsIcon height='30px' width='30px'/>
      </Link>

      <nav>
        <ul>
          {routes.map(item => (
            <NavItem key={item.label} label={item.label} href={item.href} icon={item.icon} active={item.active}/>
          ))}
        </ul>
      </nav>

      <div className='desktop menu' onClick={handleMenuClick}>
        <MenuIcon isActive={isMenuOpen}/>
        <MenuModal isOpen={isMenuOpen}/>
      </div>
    </header>
  )
}

export default Nav