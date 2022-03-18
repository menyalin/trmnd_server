const errorMiddleware = async(err, req, res) => {
  console.log('error: ', err)
  res.status(err.statusCode || 500).json(err.message)
}


export default errorMiddleware

