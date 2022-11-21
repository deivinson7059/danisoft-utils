import { NextFunction, Request, Response } from 'express';
import geoip from 'geoip-lite';

declare global {
  namespace Express {
    interface Request {
      ipInfo?: IpInfo | undefined;
    }
  }
}

export interface IpInfo {
  ip: string;
  range?: [number, number];
  country?: string;
  region?: string;
  eu?: '1' | '0';
  timezone?: string;
  city?: string;
  ll?: [number, number];
  metro?: number;
  area?: number;
  error?: string;
}

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

export declare type _noHeaderInfo = (
  autor: string
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined>;

export declare type IpInfo_ = (ip: string) => geoip.Lookup | { error: string };

//ReqController
export declare type ReqController<B> = Request<{}, {}, B>;
export declare type ReqControllerParamsBody<P, B> = Request<P, {}, B>;
export declare type ReqControllerParamsQuery<P, Q> = Request<P, {}, {}, Q>;
export declare type ReqControllerParams<P> = Request<P, {}, {}, {}>;
export declare type ReqControllerQuery<Q> = Request<{}, {}, {}, Q>;
