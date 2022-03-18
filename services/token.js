
import jwt from 'jsonwebtoken'
import TokenModel from '../models/token.js'

class TokenService {
  async generate(payload) {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRESIN
    } )
    const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRESIN
    } )
    return { accessToken, refreshToken }
  }

  async saveToken({userId, token}) {
    const existToken = await TokenModel.findOne({user: userId})
    if (existToken) {
      existToken.refreshToken = token
      await existToken.save()
      return existToken
    }  
    const newToken = await TokenModel.create({user: userId, refreshToken: token})
    return newToken
  }

  async remove(token) {
    await TokenModel.deleteOne({refreshToken: token})
    return null
  }

}

export default new TokenService()


