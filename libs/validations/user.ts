import * as z from 'zod'

export const UserRegisterValidation = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters'})
        .max(30, { message: 'Name mus be at most 30 characters'}).optional(),
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters'})
        .max(30, { message: 'Username mus be at most 30 characters'}).optional(),
    bio: z.string()
        .max(1000, { message: 'Name mus be at most 1000 characters'}).optional(),
    email: z.string().email(),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters'}),
    image: z.string().optional()
})

export const UserLoginrValidation = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters'})
})