import HttpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import UnauthenticatedError from "../error/unauthenticatedError";

import loggerWithNameSpace from "../util/logger";
import BadRequestError from "../error/badRequestError";
import NotFoundError from "../error/notFoundError";
import ConflictError from "../error/conflictError";

const logger = loggerWithNameSpace("ErrorHandler");

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 */
export function notFoundError(_req: Request, res: Response) {
  return res.status(HttpStatus.NOT_FOUND).json({
    message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
  });
}

export function genericErrorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof BadRequestError) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
  }

  if (error instanceof UnauthenticatedError) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
  }

  if (error instanceof NotFoundError) {
    return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
  }

  if (error instanceof ConflictError) {
    return res.status(HttpStatus.CONFLICT).json({ message: error.message });
  }

  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: error.message });
}
