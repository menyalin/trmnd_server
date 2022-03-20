import { Router } from 'express'
import { bodyValidator } from '../helpers/validator.js'
import userCtrl from '../controllers/user.js'
import fileCtrl from '../controllers/file.js'
import { jwtAuth } from '../middlewares/auth.js'
const  router = new Router()

router.get('/users', [jwtAuth], userCtrl.getUsers)
router.get('/files/:name', [jwtAuth], fileCtrl.getFileByName)
router.get('/files', [jwtAuth], fileCtrl.getFiles)

router.post('/refresh', userCtrl.refresh)
router.post('/registration', [bodyValidator(userCtrl.registrationSchema())], userCtrl.registration)
router.post('/login', [bodyValidator(userCtrl.loginSchema())], userCtrl.login)
router.post('/logout', userCtrl.logout)
router.post('/refresh', userCtrl.refresh)




export default router

