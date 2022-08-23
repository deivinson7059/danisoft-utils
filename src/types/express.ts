import { NextFunction, Request, Response } from 'express';
export declare type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export declare type Authorize = (
  allowedAccessTypes: string[]
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined>;

//ReqController
export declare type ReqController<B> = Request<{}, {}, B>;
export declare type ReqControllerParamsQuery<P, Q> = Request<P, {}, {}, Q>;
export declare type ReqControllerQuery<Q> = Request<{}, {}, {}, Q>;
export declare type ReqControllerParamsBody<P, B> = Request<P, {}, B>;
