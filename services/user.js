import UserModel from '../models/user.js'
import TokenService from './token.js'
import { BadRequestError } from '../helpers/exceptions.js'

class UserDTO {
  constructor({_id, name}) {
    this._id = _id.toString()
    this.name = name
  }
}

class UserService {
  
  async _getAuthResponse(userData) {
    const user = new UserDTO(userData)
    const tokens = await TokenService.generate({...user})
    await TokenService.saveToken({userId: user._id, token: tokens.refreshToken})
    return {user, ...tokens}
  }

  async registration({name, password}) {
    const existUser = await UserModel.findOne({name}).lean()
    if (existUser) throw new BadRequestError('User with the same name is already registered')
    const newUser = await UserModel.create({name, password})
    const data = await this._getAuthResponse(newUser)
    return data
  }

  async login({name, password}) {
    const existUser = await UserModel.findOne({name})
    if (existUser && await existUser.isCorrectPassword(password)) {
      const data = await this._getAuthResponse(existUser)
      return data
    }
    else throw new BadRequestError('User not found')
  }

  async logout(token) {
    await TokenService.remove(token)
    return null
  } 
  
  async refresh(token) {
    const userData = TokenService.validateRefreshToken(token)
    const updatedUser = await UserModel.findById(userData._id).lean()
    const data = await this._getAuthResponse(updatedUser)
    return data
  }

  async geUsers() {
    const users = await UserModel.find()
    return users
  }



}

export default new UserService()
 
