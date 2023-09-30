import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String }, 
    bio: { type: String }, 
    password: { type: String, required: true }, 
    isPrivate: { type: Boolean }, 
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    hasNotification: { type: Boolean }
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User