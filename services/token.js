import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../helpers/exceptions.js'
import TokenModel from '../models/token.js'

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRESIN
    } )
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRESIN
    } )
    return { accessToken, refreshToken }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(
        token,
        process.env.JWT_REFRESH_TOKEN_SECRET
      )  
    } catch (e) {
      throw new UnauthorizedError(e.message)
    }
  }
  validateAccessToken(token) {
    try {
      return jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      )
    } catch (e) {
      throw new UnauthorizedError(e.message)
    }
    
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


