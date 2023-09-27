import mongoose from 'mongoose'

const threadSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentId: {
        type: String
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ]

}, {
    timestamps: true
})

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Thread