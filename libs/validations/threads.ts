import * as z from 'zod'

export const ThreadsValidation = z.object({
    body: z.string()
        .max(30, { message: 'Thread mus be at most 500 characters' }),
    image: z.string().optional(),
    userId: z.string()
})