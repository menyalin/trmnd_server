export class BadRequestError extends Error {
  constructor(error) {
    super(error)
    this.data = error
    this.statusCode = 400
  }
}

