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
        image: string,
        isPrivate: boolean
    },
    likes: string[],
    parentId?: string,
    childrenComments: {
        author: {
            id: string
            username: string
            image: string,
            isPrivate: boolean
        }
    }[],
    quote?: {
        _id: string
        body: string,
        image: string,
        author: {
            _id: string
            username: string
            image: string,
            isPrivate: boolean
        }
    },
    createdAt: string
    currentUserId: boolean,
    currentUserUsername: string,
    currentUserImage: string,
    isReposted?: boolean,
    vairant?: string
}

export type NotificationType = {
    _id: string,
    user: string,
    from: {
        _id: string,
        username: string,
        image: string,
    },
    variant: string,
    createdAt: string
}

export type NotificationVariant = 'follow' | 'follow request' | 'follow accepted' | 'like' | 'comment' | 'repost' | 'quote'