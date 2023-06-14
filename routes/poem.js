import { Router } from 'express'

import { checkAuth } from '../utils/checkAuth.js'
import {
    addPoem,
    updatePoem,
    incrementViews,
    getAllPoems,
    getPoemById,
    removePoem,
    getMyPoems,
    likedPoem,



    selectedPoem,
    getSelectedPoems,
} from '../controllers/poem.js'

const router = new Router()

// Add poem
// http://localhost:3001/api/poem/add
router.post('/add', checkAuth, addPoem)

// Update poem
// http://localhost:3001/api/poem/:id
router.put('/:id', checkAuth, updatePoem)

// Liked poem
// http://localhost:3001/api/poem/liked/:id
router.put('/liked/:id', checkAuth, likedPoem)

// Get all poems
// http://localhost:3001/api/poem
router.get('/', getAllPoems)

// Get poem by id
// http://localhost:3001/api/poem/:id
router.get('/:id', getPoemById)

// Increment views
// http://localhost:3001/api/poem/:id/increment
router.put('/:id/increment', incrementViews)

// Remove poem
// http://localhost:3001/api/poem/:id
router.delete('/:id', checkAuth, removePoem)

// Get my poems
// http://localhost:3001/api/poem/user/me
router.get('/user/me', checkAuth, getMyPoems)



// Selected poem
// http://localhost:3001/api/poem/selected
router.post('/selected', checkAuth, selectedPoem)

// Get all selected poem 
// http://localhost:3001/api/poem/all/allselected
router.get('/all/selected', checkAuth, getSelectedPoems)




export default router
