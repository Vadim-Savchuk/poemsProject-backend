import { Router } from 'express'

import { register, login, getMe } from '../controllers/auth.js'
import { checkAuth }              from '../utils/checkAuth.js'

const router = new Router()

// Register user
// http://localhost:3001/api/auth/register
router.post('/register', register)

// Login user
// http://localhost:3001/api/auth/login
router.post('/login', login)

// Get user
// http://localhost:3001/api/auth/me
router.get('/me', checkAuth, getMe)

export default router