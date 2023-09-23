import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if (!process.env.DATABASE_URL) return console.log('DATABASE_URL not found')
    if (isConnected) return console.log('DB on')

    try {
        await mongoose.connect(process.env.DATABASE_URL)

        isConnected = true

        console.log('>>> DB Connected')
    } catch (error) {
        console.log(error)
    }
}