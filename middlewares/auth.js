import TokenService from '../services/token.js'
import { UnauthorizedError } from '../helpers/exceptions.js'

export const jwtAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const payload = TokenService.validateAccessToken(token)
      req.userId = payload._id
      next()
    } catch (e) {
      next(e)
    }
  } else throw new UnauthorizedError()
}
