import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    variant: { type: String, required: true },
    reference: {
        thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
        author: { type: String }
    }
}, {
    timestamps: true
})

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

export default Notification