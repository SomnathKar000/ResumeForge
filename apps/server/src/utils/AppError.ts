class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, status?: number) {
    super(message);
    this.statusCode = status || 500;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
