import Link from "next/link"

interface NavItemProps {
  label: string,
  icon: any,
  href: string,
  active?: boolean,
}

const NavItem: React.FC<NavItemProps> = ({ label, href, icon: Icon, active }) => {
  return (
    <li>
      <Link className='item' href={href}>
        <Icon isActive={active}/>
        <div className='bg'></div>
      </Link> 
    </li>
  )
}

export default NavItem