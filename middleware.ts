import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: '/login'
    }
})

export const config = {
    matcher: [
        '/:path',
        '/profile/:path',
        '/profile/edit/:path',
        '/create/:path'
    ]
}