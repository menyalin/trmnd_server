import jwt from 'jsonwebtoken'
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
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET
    )
  }
  validateAccessToken(token) {
    return jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET
    )
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


