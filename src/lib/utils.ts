import * as axios from 'axios';
import * as qs from 'qs';

import * as fs from 'fs';
import https from 'https';
import http from 'http';

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

/**
 * @description generar uid
 *
 * @param {number} num? - Numero de caracteres
 * @returns {string}
 */

export const generateUid = (num?: number): string => {
  if (num === undefined) {
    num = 21;
  }

  const date = new Date();
  const characters = `abc${date.getMonth()}def${date.getFullYear()}nlmst${date.getTime()}urvxy`;

  let result = '5fe';
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * @description convertir a boolean
 *
 * @param {string} data? - Valor a convertir
 * @returns {boolean}
 */
export const convertirBoolean = (data?: string): boolean => {
  if (data === undefined) {
    return false;
  }
  if (data === 'true') {
    return true;
  }
  if (data === 'false') {
    return false;
  }
  return false;
};

/**
 * @description convertir cronometro a string
 *
 * @param {number} segundosP? - Segundos a convertir
 * @returns {string}
 */
export const convCronomet = (segundosP?: number): string => {
  if (segundosP === undefined) {
    return '00:00';
  }
  //let horas:string = Math.floor(segundosP / 0xe10).toString();
  let seg: number = Math.round(segundosP % 0x3c);
  let min: number = Math.floor(segundosP / 0x3c) % 0x3c;
  let segundos: string = seg > 9 ? seg.toString() : `0${seg}`;
  let minutos: string = min > 9 ? min.toString() : `0${min}`;

  return `${minutos}:${segundos}`;
};

/**
 * @description retorna el promedio de un array
 *
 * @param {number[]} num - Array de numeros
 * @returns {string}
 */
export const getProm = (num: number[]): string => {
  let suma: number = 0;
  let cont: number = 0;
  num.forEach(element => {
    if (element.toString() !== '0.00') {
      //console.log(suma);
      // console.log(cont);
      // console.log(element);
      suma += parseFloat(element.toString());
      cont++;
    }
  });
  if (cont === 0) {
    return '0.00';
  } else {
    return (suma / cont).toFixed(2);
  }
};

/**
 * @description optener codigo opt
 *
 * @returns {string}
 */
export const obtenerClave = (): string => {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let clave = '';
  for (let i = 0; i < 6; i++)
    clave += numbers[Math.floor(Math.random() * numbers.length)];
  return clave;
};
/**
 * @description obtener pass random
 * @param {number} num - Array de numeros
 * @returns {string}
 */

export const obtenerPassTemp = (num: number = 8): string => {
  const characters = `a$bc4567efABC*DEFGg@hijklNOP-QRSmnopqrstuvw+xyz012389HIJKL#MTUVWXYZ`;

  let result = '';
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * @description obtener string random
 * @returns {string}
 */
export const randonAuth = (): string => {
  let num = 32;

  const date = new Date();
  const characters = `abcdefghi${date.getTime()}jklmnopqrstuvwxyz0123456789`;

  let result = '';
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * @description limpiar un string *
 * @param {string} s - string a limpiar
 * @returns {string}
 */
export const limpiar = (s: string): string => {
  let r = s.toLowerCase();
  r = r.replace(new RegExp(/\s/g), ' ');
  r = r.replace(new RegExp(/[àáâãäå]/g), 'a');
  r = r.replace(new RegExp(/[èéêë]/g), 'e');
  r = r.replace(new RegExp(/[ìíîï]/g), 'i');
  r = r.replace(new RegExp(/ñ/g), 'n');
  r = r.replace(new RegExp(/[òóôõö]/g), 'o');
  r = r.replace(new RegExp(/[ùúûü]/g), 'u');
  return r;
};

/**
 * @description get distance between two points
 *
 * @param {number} lat1 - Latitud 1
 * @param {number} lon1 - Longitud 1
 * @param {number} lat2 - Latitud 2
 * @param {number} lon2 - Longitud 2
 * @returns {string}
 */
export const getKilometros = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string => {
  let rad = (x: number): number => (x * Math.PI) / 180;
  let R = 6378.137; //Radio de la tierra en km
  let dLat = rad(lat2 - lat1);
  let dLong = rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d.toFixed(2); //Retorna tres decimales
};

/**
 * @description  get access permission route
 * @param {string} role - Role
 * @returns {string}
 */
export const getAccessTypes = (role: string): string[] => {
  let resul: string[] = [];
  if (role === 'ADMIN_ROLE') {
    resul = ['admin'];
  } else if (role === 'VENTA_ROLE') {
    resul = ['sale'];
  } else if (role === 'CONTADOR_ROLE') {
    resul = ['account'];
  } else if (role === 'DEVELOP_ROLE') {
    resul = ['dev', 'admin', 'account', 'sale'];
  }

  return resul;
};
export async function base64MimeType(encoded: string): Promise<string | null> {
  var result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

export function ImgCode(num: number) {
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
}

export async function detectMimeType(b64: string): Promise<string> {
  let mime = await base64MimeType(b64);
  if (mime === null) {
    return 'none';
  } else {
    let df = `data:${mime};base64,`;

    let encoded = b64.replace(df, '');
    return encoded;
  }
}

export async function saveExternalFile(
  url: string,
  path_: string = 'storage/mediaSend'
): Promise<any> {
  return new Promise(resolve => {
    const ext = url.split('.').pop();
    const checkProtocol = url.split('/').includes('https:');
    const handleHttp = checkProtocol ? https : http;
    const name = `${ImgCode(50)}.${ext}`;
    const file = fs.createWriteStream(`${path_}/${name}`);
    handleHttp.get(url, function(response: any) {
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        resolve(name);
      });
      file.on('error', function() {
        console.log('errro');
        file.close();
        resolve(null);
      });
    });
  });
}
