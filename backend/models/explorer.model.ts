import mongoose, { Schema } from 'mongoose'

const explorerSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'UserModel', 
    },
    explorer: [{ 
        id: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
            default: '../',
        },
        folder_path: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        }
    }],
})

const ExplorerModel = mongoose.model("ExplorerModel", explorerSchema)

export default ExplorerModel