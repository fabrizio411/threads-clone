interface IconProps {
    isActive?: boolean
  }
  
  const MenuIcon: React.FC<IconProps> = ({ isActive }) => {
    return (
      isActive ? (
        <svg color="rgb(243, 245, 247)" fill="rgb(243, 245, 247)" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="currentColor" height="2.5" rx="1.25" width="21" x="3" y="7"></rect><rect fill="currentColor" height="2.5" rx="1.25" width="14" x="10" y="15"></rect></svg>
      ) : (
        <svg color="rgb(77, 77, 77)" fill="rgb(77, 77, 77)" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="currentColor" height="2.5" rx="1.25" width="21" x="3" y="7"></rect><rect fill="currentColor" height="2.5" rx="1.25" width="14" x="10" y="15"></rect></svg>
      )
    )
  }
  
  export default MenuIcon