import { UnauthorizedError } from '../helpers/exceptions.js'
import FileService from '../services/file.js'
import TokenService from '../services/token.js'

class  FileController {
  async uploadFile(req, res, next) {
    try {
      const data = await FileService.uploadFile({file: req.file, user: req.userId})
      res.status(201).json(data)
    }catch (e) {
      next(e)
    }
  }

  async getFileByName(req, res, next) {
    try {
      const data = await FileService.getFile({user: req.userId, name: req.params.name })
      res.json(data)
    } catch (e) {
      next(e)
    }
  }
  
  async accessControl(req, res, next) {
    try {
      const fileLink = req.header('x-original-uri')
      const owner = fileLink.split('/')[2]
      const {refreshToken} = req.cookies
      const user = TokenService.validateRefreshToken(refreshToken)
      if (user._id === owner)
        res.sendStatus(200)
      else throw UnauthorizedError()
    } catch (e) {
      next(e)
    }
  }

  async getFiles(req, res, next) {
    try {
      const data = await FileService.getFiles(req.userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }
  
}

export default new FileController()
