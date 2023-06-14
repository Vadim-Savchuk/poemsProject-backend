import mongoose from 'mongoose'

const PoemSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        poem: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: String,
            }
        ],
        background: {
            type: String,
            default: '#fff',
        },
        font: {
            type: String,
        },
        description: {
            type: String,
            default: 'Опис відсутній',
        }

    }, { timestamps: true }
)

export default mongoose.model('Poem', PoemSchema)