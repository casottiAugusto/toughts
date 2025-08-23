const express =require('express')
const router = express.Router()
const authRoutes = require('../controllers/AuthController')

router.get('/login', authRoutes.login)
router.post('/login', authRoutes.loginPost)
router.get('/register', authRoutes.register)
router.post('/register', authRoutes.registerPost)

router.get('/logout', authRoutes.logout)

module.exports = router