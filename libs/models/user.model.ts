import mongoose from 'mongoose'
import { boolean } from 'zod'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    bio: {
        type: String
    },
    isPrivate: {
        type: Boolean
    },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Threads'
        }
    ],
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User