import jwt from 'jsonwebtoken'


export const jwtAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const payload = await jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      )
      req.userId = payload._id
      next()
    } catch (e) {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
}
