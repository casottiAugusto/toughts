const express =require('express')
const router = express.Router()
const authRoutes = require('../controllers/AuthController')

router.get('/login', authRoutes.login)
router.get('/register', authRoutes.register)

module.exports = router