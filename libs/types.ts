export type UserType = {
    _id: string,
    name: string,
    username: string,
    email: string,
    image: string,
    bio: string,
    password: string,
    isPrivate: string,
    threads: string[],
    reports: string[],
    followers: string[]
    following: string[]
    followRequests: string[]
    hasNotification?: boolean,
    createdAt: string,
    updatedAt: string
}

export type ThreadType = {
    _id: string,
    body: string,
    image: string,
    author: {
        _id: string,
        username: string,
        image: string
    },
    likes: string[],
    parentId?: string,
    children: {
        author: {
            id: string
            username: string
            image: string
        }
    }[],
    quote?: string,
    createdAt: string
    currentUserId: boolean,
    vairant?: string
}