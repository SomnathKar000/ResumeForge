import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.isOperational ? error.message : "Something went wrong";

  if (!error.isOperational) {
    console.log("Got an unexpected error", error);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    statusCode: error.statusCode,
  });
};

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Api endpoint not found",
  });
};

export { notFoundHandler, errorHandler };
