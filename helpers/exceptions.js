export class BadRequestError extends Error {
  constructor(error) {
    super(error)
    this.data = error
    this.statusCode = 400
  }
}

export class UnauthorizedError extends Error {
  constructor(error) {
    super(error)
    this.data = error
    this.statusCode = 401
  } 
}
