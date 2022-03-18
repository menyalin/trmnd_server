import { Router } from 'express'
import { bodyValidator } from '../helpers/validator.js'
import userCtrl from '../controllers/user.js'
const  router = new Router()


router.post('/registration', [bodyValidator(userCtrl.registrationSchema())], userCtrl.registration)
router.post('/login', [bodyValidator(userCtrl.loginSchema())], userCtrl.login)
router.post('/logout', userCtrl.logout)
router.post('/refresh')
router.get('/users', (...args) => userCtrl.getUsers(...args))


export default router

