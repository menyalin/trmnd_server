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
  
  async registration({name, password}) {
    const existUser = await UserModel.findOne({name}).lean()
    if (existUser) throw new BadRequestError('User with the same name is already registered ')
    const newUser = await UserModel.create({name, password})
    const user = new UserDTO(newUser)
    const { accessToken, refreshToken } = await TokenService.generate({...user})
    await TokenService.saveToken({userId: user._id, token: refreshToken})
    return { accessToken, refreshToken, user }
  }

  async login({name, password}) {
    const existUser = await UserModel.findOne({name})
    if (existUser && await existUser.isCorrectPassword(password)) {
      const user = new UserDTO(existUser)
      const { accessToken, refreshToken } = await TokenService.generate({...user})
      await TokenService.saveToken({userId: user._id, token: refreshToken})
      return { accessToken, refreshToken, user }
    }
    else throw new BadRequestError('User not found')
  }

  async logout(token) {
    await TokenService.remove(token)
    return null
  } 
  
  async refresh(token) {
    console.log(token)
  }



}

export default new UserService()
 
