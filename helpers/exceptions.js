export class BadRequestError extends Error {
  constructor(error) {
    super(error)
    this.status = 400
  }
}

export class UnauthorizedError extends Error {
  constructor(error) {
    super(error)
    this.status = 401
    
  } 
}

export class ConflictError extends Error {
  constructor(error) {
    super(error)
    this.status = 409
  } 
}



