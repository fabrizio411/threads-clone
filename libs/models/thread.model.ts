import mongoose from 'mongoose'

const threadSchema = new mongoose.Schema({
    body: { type: String, required: true },
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }, 
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
}, {
    timestamps: true
})

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Thread