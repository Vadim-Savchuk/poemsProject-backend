import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        poems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Poem',
        }],
        selectedPoems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Poem',
        }]

    }, { timestamps: true }
)

export default mongoose.model('User', UserSchema)