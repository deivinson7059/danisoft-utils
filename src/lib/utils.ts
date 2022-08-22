import * as axios from 'axios';
import * as qs from 'qs';

import { apiResponse } from '../types/utils';

/**
 * @description transform unarray a string
 *
 * @param {any[]} allowedValues - Array to transform
 * @returns {string}
 */
export const traformsArray = (allowedValues: any[]): string => {
  let cont = 0;

  let _allowedValues: any = allowedValues.map((item: string) => {
    let _item = '';
    if (cont === 0) {
      _item += `'${item}'`;
    } else if (cont < allowedValues.length - 1) {
      _item += `'${item}', `;
    } else {
      _item += `'${item}'`;
    }
    cont++;
    return _item;
  });

  _allowedValues = _allowedValues.toString();

  _allowedValues = replaceAll(_allowedValues, ', ,', ',');

  return _allowedValues;
};

/**
 * @description escape special characters
 *
 * @param {string} s - String to escape
 * @returns {string}
 */
const escapeRegExp = (s: string): string => {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
/**
 * @description replace all estring
 *
 * @param {string} str - String to replace
 * @param {string} match - String to find
 * @param {string} replacement - String to replace
 * @returns {string}
 */
export const replaceAll = (
  str: string,
  match: string,
  replacement: string
): string => {
  return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
};

/**
 * @description Convertir a minusculas un array
 *
 * @param {any[]} data - Array to convert
 * @returns {any[]}
 */
export const lowerKeys = (data: any[]): any[] => {
  let obj: any[] = [];
  obj = data.map(function(item: any) {
    for (var key in item) {
      var upper = key.toLowerCase();
      // check if it already wasn't uppercase
      if (upper !== key) {
        item[upper] = item[key];
        delete item[key];
      }
    }
    return item;
  });
  return obj;
};
/**
 * @description Verificar si esta vacio un array
 *
 * @param {any[]} data - Array to check
 * @returns {boolean}
 */
export const isEmptyArray = (data: any[]): boolean => {
  return data.length === 0 ? true : false;
};

/**
 * @description retorna plataforma
 *
 * @param {string} platform_id? - Id de la plataforma
 * @returns {string}
 */
export const getPlatform = (platform_id?: string): string => {
  let _platform_id = parseInt(platform_id || '0');
  return '0' + _platform_id;
};

/**
 * @description string aleatorio
 *
 * @param {number} num? - Numero de caracteres
 * @returns {string}
 */
export const getCodAleatorio = (num?: number): string => {
  if (num === undefined) {
    num = 14;
  }

  const date = new Date();
  const characters = `ABCDEFGHI${date.getFullYear()}JKLMNOPQRSTUVWXYZ${date.getMonth()}abcdefghi${date.getTime()}jklmnopqrstuvwxyz0123456789`;

  let result = '';
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * @description redondear una cifra
 *
 * @param {number} value - Valor a redondear
 * @param {number} round - factor de redondeo
 * @returns {number}
 */
export const roundDs = (value: number, round: number = 50): number => {
  let result = 0;
  let v = value / round;
  let cant = parseInt(v.toString());
  let mod = value % round;
  if (mod > 25) {
    result = cant * round + round;
  } else {
    result = cant * round;
  }
  return result;
};

/**
 * @description pedir una peticion a una url
 *
 * @param {string} endpoint - Url de la peticion
 * @param {string} accessToken - Token de acceso
 * @param {string} method - Metodo de la peticion
 * @param {any = {}} parameters - Parametros de la peticion
 * @param {any} headers? - Cabeceras de la peticion
 * @returns {Promise<any>}
 */
export const callApi = async (
  endpoint: string,
  accessToken: string,
  method: string = 'get',
  parameters: any = {},
  headers?: any
): Promise<any> => {
  let _headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  };

  if (headers !== undefined) {
    _headers = headers;
  }

  let response: axios.AxiosResponse;
  try {
    if (method === 'post' || method === 'POST') {
      response = await axios.default.post(endpoint, parameters, _headers);
    } else if (method === 'put' || method === 'PUT') {
      response = await axios.default.put(endpoint, parameters, _headers);
    } else {
      let params: any = qs.stringify(parameters);
      response = await axios.default.get(endpoint, params);
    }

    let resp: apiResponse = {
      error: false,
      data: response.data,
    };

    return resp;
  } catch (error) {
    //console.log(error);

    let resp: apiResponse<any> = {
      error: true,
      data: error,
    };
    return resp;
  }
};
