import User from '../models/User.js'
import Poem from '../models/Poem.js'

// Add poem
export const addPoem = async (req, res) => {
    try {
        const { title, poem, background, description, font } = req.body

        const user = await User.findById(req.userId)

        const newPoem = new Poem({
            font: font ? font : 'unset',
            poem,
            title,
            author: req.userId,
            background: background ? background : '#fff',
            description: description ? description : 'Опис відсутній',
            username: user.username,
        })

        await newPoem.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { poems: newPoem }
        })

        return res.json(newPoem)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при спробі додати новий вірш'
        })
    }
}

// Update poem
export const updatePoem = async (req, res) => {
    try {
        const {
            id,
            font,
            poem,
            likes,
            title,
            username,
            userLiked,
            background,
        } = req.body

        const poemId = await Poem.findById(id)
        const userIsliked = poemId.likes.some(user => user === req.userId)

        if (userIsliked) {
            poemId.likes = poemId.likes.filter(user => user !== req.userId)
        } else {
            poemId.likes.push(req.userId)
        }

        poemId.font = font
        poemId.poem = poem
        poemId.title = title
        poemId.background = background

        await poemId.save()

        res.json(poemId)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при редагуванні вірша'
        })
    }
}

// Liked poem
export const likedPoem = async (req, res) => {
    try {
        const { id } = req.body

        const poemId = await Poem.findById(id)
        const userIsliked = poemId.likes.some(user => user === req.userId)

        if (userIsliked) {
            poemId.likes = poemId.likes.filter(user => user !== req.userId)
        } else {
            poemId.likes.push(req.userId)
        }

        await poemId.save()

        res.json(poemId)
    } catch (error) {
        res.json({
            message: 'Сталась помилка коли ви вподобали вірш'
        })
    }
}

// Get all poems
export const getAllPoems = async (req, res) => {
    try {
        const poems = await Poem.find().sort({ createdAt: -1 })

        if (!poems) {
            return res.json({
                messasge: 'Віршів немає'
            })
        }

        res.json(poems)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при отримані всіх віршів'
        })
    }
}

// Get poem by Id
export const getPoemById = async (req, res) => {
    try {
        // const poem = await Poem.findByIdAndUpdate(req.params.id, {
        //     $inc: { views: 1 },
        // })
        const poem = await Poem.findById(req.params.id)

        res.json(poem)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при отримані вірша'
        })
    }
}

// Increment views
export const incrementViews = async (req, res) => {
    try {
        const poem = await Poem.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })

        res.json(poem)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при отримані вірша'
        })
    }
}

// Remove poem
export const removePoem = async (req, res) => {
    try {
        const poem = await Poem.findByIdAndDelete(req.params.id)

        if (!poem) {
            res.json({
                message: 'Такого вірша не існує'
            })
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { poems: req.params.id }
        })

        res.json({
            message: 'Вірш був видалений'
        })
    } catch (error) {
        res.json({
            message: 'Сталась помилка при отримані вірша'
        })
    }
}

// Get my poems
export const getMyPoems = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const myPoems = await Promise.all(
            user.poems.map(poem => {
                return Poem.findById(poem._id)
            })
        )

        res.json(myPoems)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при отримані вірша'
        })
    }
}




// Selected poem
export const selectedPoem = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findById(req.userId);
        const poem = await Poem.findById(id)

        const poemIndex = user.selectedPoems.findIndex(p => p._id.equals(poem._id));

        if (poemIndex !== -1) {
            user.selectedPoems.splice(poemIndex, 1);
        } else {
            user.selectedPoems.push(poem);
        }

        await user.save();

        res.json({
            poem,
        });
    } catch (error) {
        res.json({
            message: 'Сталась помилка при спробі додати вірш до вибраних'
        })
    }
}

// Get all selected poems
export const getSelectedPoems = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('selectedPoems');
        
        res.json({
            selectedPoems: user.selectedPoems
        });
    } catch (error) {
        res.json({
            message: 'Сталась помилка при отриманні обраних віршів'
        });
    }
};