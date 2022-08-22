import * as axios from 'axios';
import * as qs from 'qs';

import { apiResponse } from '../types/utils';

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
const escapeRegExp = (s: string): string => {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
/* remplace un string */
export const replaceAll = (
  str: string,
  match: string,
  replacement: string
): string => {
  return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
};

/* Convertir a minusculas un array */
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
/* Verificar si esta vacio un array */
export const isEmptyArray = (data: any[]): boolean => {
  return data.length === 0 ? true : false;
};

export const getPlatform = (platform_id?: string): string => {
  let _platform_id = parseInt(platform_id || '0');
  return '0' + _platform_id;
};

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
