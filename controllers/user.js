import { UnauthorizedError } from '../helpers/exceptions.js'
import UserService from '../services/user.js'

class UserController {
  
  registrationSchema() {
    return {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 4 },
      },
      required: ['password', 'name'],
      additionalProperties: false
    } 
  }
  async registration(req, res, next) {
    try {
      const data = await UserService.registration(req.body)
      res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30*24*60*60*1000 })
      res.status(201).json(data) 
    }catch (e) {
      next(e)
    }
  }


  loginSchema() {
    return {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 4 },
      },
      required: ['password', 'name'],
      additionalProperties: false
    } 
  }
  async login (req, res, next) {
    try {
      const data = await UserService.login(req.body)
      res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30*24*60*60*1000 })
      res.status(200).json(data) 
    }catch (e) {
      next(e)
    }

  }
   
  async logout(req, res, next) {
    try {
      if (req.cookies.refreshToken) await UserService.logout(req.cookies.refreshToken)
      res.clearCookie('refreshToken')
      res.sendStatus(200)
    } catch(e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies  
      if (!refreshToken) 
        throw new UnauthorizedError()
      const data = await UserService.refresh(refreshToken) 
      res.json(data)
    } catch(e) {
      next(e)
    }
  }


}

export default new UserController()

