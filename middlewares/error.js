// eslint-disable-next-line no-unused-vars
const errorMiddleware = async(err, req, res, next) => {
  return res.status(err.status|| 500).json(err.message)
}

export default errorMiddleware

