import FileModel from '../models/file.js'

class FileService {
  async getFiles(user) {
    const files = await FileModel.find({owner: user}).lean()
    return files
  }
  
  async getFile({ user, name} ) {
    const file = await FileModel.findOne({owner: user, name}).lean()
    return file
  }

  async uploadFile({file, user}) {
    const newFileItem = await FileModel.create({
      name: file.originalname, 
      size: file.size,
      mimetype: file.mimetype,
      owner: user,
      link: `/static/${user}/${file.originalname}`
    })
    return newFileItem
  }

}

export default new FileService()

