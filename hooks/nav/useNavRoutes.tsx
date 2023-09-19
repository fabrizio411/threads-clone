import ActivityIcon from '@/components/icons/nav-icons/ActivityIcon'
import CreateIcon from '@/components/icons/nav-icons/CreateIcon'
import HomeIcon from '@/components/icons/nav-icons/HomeIcon'
import ProfileIcon from '@/components/icons/nav-icons/ProfileIcon'
import SearchIcon from '@/components/icons/nav-icons/SearchIcon'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const useNavRoutes = () => {
    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            label: 'Home',
            href: '/home',
            icon: HomeIcon,
            active: pathname === '/home'
        },
        {
            label: 'Search',
            href: '/search',
            icon: SearchIcon,
            active: pathname === '/search'
        },
        {
            label: 'Create',
            href: '/create',
            icon: CreateIcon,
            active: pathname === '/create'
        },
        {
            label: 'Activity',
            href: '/activity',
            icon: ActivityIcon,
            active: pathname === '/activity'
        },
        {
            label: 'Profile',
            href: '/profile',
            icon: ProfileIcon,
            active: pathname === '/profile'
        }
    ], [pathname])

    return routes
}

export default useNavRoutes