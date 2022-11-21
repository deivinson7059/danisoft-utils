import { NextFunction, Request, Response } from 'express';

import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import ajvKeywords from 'ajv-keywords';

import { ErrorObject } from 'ajv';
import localize_es from 'ajv-i18n/localize/es';
import { replaceAll, traformsArray } from './utils';
import { ResponseTraitService } from './responsetrait.service';
import { Options, options_, ParsedQuery } from '../types/ajv';

//inicializamos response trait
const responsetrait = new ResponseTraitService();

const ajv: Ajv = new Ajv({ strictTypes: false });
ajvFormats(ajv);
ajvKeywords(ajv);
require('ajv-base64')(ajv);

/**
 * @description localize ajv errors
 *
 * @param {ErrorObject[] | null} errors - Errors from ajv
 * @returns {string }
 */
export const logMessageErrors = (errors?: ErrorObject[] | null): string => {
  localize_es(errors);
  let message: string = '';
  // console.log(errors);

  if (errors !== undefined && errors !== null) {
    let error = errors[0];

    if (error.keyword === 'required') {
      let msmTemp = '';
      let campo = error.params.missingProperty;
      msmTemp = `El campo '${campo}' es obligatorio`;
      message = msmTemp;
    } else if (error.keyword === 'uniqueItems') {
      let campo = error.instancePath.split('/');

      let msmTemp = '';
      msmTemp = `El campo '${campo[campo.length - 1]}' ${error.message}`;
      message = msmTemp;
    } else if (error.keyword === 'format') {
      let msmTemp = '';
      let campo = error.instancePath.split('/');
      let campoName = campo[campo.length - 1];

      if (parseInt(campoName) > 0) {
        campoName = `${campo[campo.length - 2]}[${campoName}]`;
      }

      // console.log(campoName);

      msmTemp = `El campo '${campoName}' ${error.message}`;
      msmTemp = replaceAll(msmTemp, '"', "'");
      //msmTemp = msmTemp.replace('"', "'");
      message = msmTemp;
    } else if (error.keyword === 'enum') {
      let msmTemp = '';
      let campo = error.instancePath.split('/');

      let allowedValues = traformsArray(error.params.allowedValues);
      msmTemp = `El campo '${campo[campo.length - 1]}' ${
        error.message
      }:${allowedValues}`;
      message = msmTemp;
    } else {
      let msmTemp = '';
      let campo = error.instancePath.split('/');

      msmTemp = `El campo '${campo[campo.length - 1]}' ${error.message}`;
      message = msmTemp;
    }
  } else {
    message = '';
  }

  return message;
};

/**
 * @description validate body request
 *
 * @param {object} schema - Schema to validate
 */
export function validateBodyRequest(schema: object) {
  // compile schema
  const validate = ajv.compile(schema);
  // middleware that returns error if schema is not ok
  return (req: any, res: Response, next: NextFunction) => {
    if (!validate(req.body)) {
      let errors = validate.errors;

      let msm = logMessageErrors(errors);

      return res
        .status(200)
        .send(responsetrait.response({}, 400, msm, 'data', false));
    }
    return next();
  };
}

/**
 * @description validate params request
 *
 * @param {object} schema - Schema to validate
 */
export function validateParamsRequest(schema: object) {
  // compile schema
  const validate = ajv.compile(schema);
  // middleware that returns error if schema is not ok
  return (req: any, res: Response, next: NextFunction) => {
    req.params = parse(req.params);

    // console.log(req.params);
    if (!validate(req.params)) {
      let errors = validate.errors;

      let msm = logMessageErrors(errors);

      return res
        .status(200)
        .send(responsetrait.response({}, 400, msm, 'data', false));
    }
    return next();
  };
}

/**
 * @description validate query request
 *
 * @param {object} schema - Schema to validate
 */
export function validateQueryRequest(schema: object) {
  // compile schema
  const validate = ajv.compile(schema);
  // middleware that returns error if schema is not ok
  return (req: any, res: Response, next: NextFunction) => {
    req.query = parse(req.query);
    if (!validate(req.query)) {
      let errors = validate.errors;

      let msm = logMessageErrors(errors);

      return res
        .status(200)
        .send(responsetrait.response({}, 400, msm, 'data', false));
    }
    return next();
  };
}

/**
 * @description parse query request
 *
 * @param {ParsedQuery} target - Query to parse
 * @param {Options} options - Options to parse
 * @returns {ParsedQuery }
 */

export const parse = (
  target: ParsedQuery,
  options: Options = options_
): ParsedQuery => {
  switch (typeof target) {
    case 'string':
      if (target === '') {
        return '';
      } else if (options.parseNull && target === 'null') {
        return null;
      } else if (options.parseUndefined && target === 'undefined') {
        return undefined;
      } else if (
        options.parseBoolean &&
        (target === 'true' || target === 'false')
      ) {
        return target === 'true';
      } else if (options.parseNumber && !isNaN(Number(target))) {
        return Number(target);
      } else {
        return target;
      }
    case 'object':
      if (Array.isArray(target)) {
        return target.map(x => parse(x, options));
      } else {
        const obj = target;
        Object.keys(obj).map(key => (obj[key] = parse(target[key], options)));
        return obj;
      }
    default:
      return target;
  }
};

/**
 * @description parse query server
 *
 * @param {Options} options - Options to parse
 */
export const queryParser = (options: Options = options_) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query = parse(req.query, options);
  res.locals.query = { ...res.locals.query };
  //console.log("query:::", req.query);
  next();
};

/**
 * @description escape string to sql
 *
 * @param {str} string - String to escape
 */
export function escape_inyection(str: string): string {
  return str.replace(/[\0\\x08\\x09\\x1a\n\r"'\\\\%]/g, (char: string) => {
    switch (char) {
      case '\0':
        return '\\0';
      case '\x08':
        return '\\b';
      case '\x09':
        return '\\t';
      case '\x1a':
        return '\\z';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '"':
      case "'":
      case '\\':
      case '%':
        return '\\' + char;
      default:
        return char;
    }
  });
}

/**
 * @description escape string to sql
 *
 * @param {ParsedQuery} target - Query to parse
 * @param {Options} options - Options to parse
 * @returns {ParsedQuery }
 */

export const parse_inyection = (
  target: ParsedQuery,
  options: Options = options_
): ParsedQuery => {
  switch (typeof target) {
    case 'string':
      if (target === '') {
        return '';
      } else if (options.parseNull && target === 'null') {
        return null;
      } else if (options.parseUndefined && target === 'undefined') {
        return undefined;
      } else if (
        options.parseBoolean &&
        (target === 'true' || target === 'false')
      ) {
        return target === 'true';
      } else if (options.parseNumber && !isNaN(Number(target))) {
        return Number(target);
      } else {
        return escape_inyection(target);
      }
    case 'object':
      if (Array.isArray(target)) {
        return target.map(x => parse_inyection(x, options));
      } else {
        const obj = target;
        Object.keys(obj).map(
          key => (obj[key] = parse_inyection(target[key], options))
        );
        return obj;
      }
    default:
      return target;
  }
};
