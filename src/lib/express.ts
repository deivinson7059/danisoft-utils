import geoip from 'geoip-lite';
import { IpInfo_, Middleware, _noHeaderInfo } from '../types/express';
import { parse_inyection } from './ajv';

export const getIpInfoMiddleware: Middleware = async (req, _, next) => {
  let _xForwardedFor = req.headers['x-forwarded-for'] || '';

  let xForwardedFor: string = _xForwardedFor as string;

  let xForwardedFor_ = xForwardedFor.replace(/:\d+$/, '');

  let ip: string = xForwardedFor_ || (req.connection.remoteAddress as string);
  req.ipInfo = { ip, ...getIpInfo(ip) };
  return next();
};

export const getIpInfo: IpInfo_ = ip => {
  /* 
    IPV6 addresses can include IPV4 addresses
    So req.ip can be '::ffff:86.3.182.58'
    However geoip-lite returns null for these
 */

  if (ip.includes('::ffff:')) {
    ip = ip.split(':').reverse()[0];
  }
  let lookedUpIP = geoip.lookup(ip);
  if (ip === '127.0.0.1' || ip === '::1') {
    return {
      error: "This won't work on localhost",
    };
  }
  if (!lookedUpIP) {
    return {
      error: 'Error occured while trying to process the information',
    };
  }
  return lookedUpIP;
};

/* 
    limpier inyecion sql
 */
export const cleanSqlInjection: Middleware = async (req, _, next) => {
  req.body = parse_inyection(req.body);
  return next();
};
/* 
    no header info
 */
export const noHeaderInfo: _noHeaderInfo = (
  autor: string = 'Danisoft sas'
) => async (_: any, res: any, next: any) => {
  res.setHeader('X-Powered-By', autor);
  return next();
};
