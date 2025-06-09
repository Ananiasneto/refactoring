import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string
}

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction) {

  console.log(error);

  const { name, message } = error;

  const hashMappingErrors={
    NotFound:()=>res.status(httpStatus.NOT_FOUND).send(message),
    Conflict:()=>res.status(httpStatus.CONFLICT).send(message),
    BadRequest:()=>res.status(httpStatus.BAD_REQUEST).send(message),
    UnprocessableEntity:()=>res.status(httpStatus.UNPROCESSABLE_ENTITY).send(message),
    Forbidden:()=>res.status(httpStatus.FORBIDDEN).send(message)
  }
  const typeErrorExist=hashMappingErrors[name];
   if (typeErrorExist) {
    return hashMappingErrors[name]();
  }else{
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}