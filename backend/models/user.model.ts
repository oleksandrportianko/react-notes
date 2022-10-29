import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel