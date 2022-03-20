import FileService from '../services/file.js'

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
