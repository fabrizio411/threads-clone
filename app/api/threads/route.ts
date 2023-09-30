import { getProfileThreads } from '@/libs/actions/threads.actions'
import { getUser } from '@/libs/actions/user.actions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { username } = body
    
        const user = await getUser(username)
        const threads = await getProfileThreads(user._id)

        const result = {
            user,
            threads
        }

        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return new NextResponse('FETCHTHREADS_ERROR', { status: 500 })
    }
}