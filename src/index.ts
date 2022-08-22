import { ErrorObject } from 'ajv';
import localize_es from 'ajv-i18n/localize/es';
import * as axios from 'axios';
import * as qs from 'qs';
import * as Avatar from 'avatar-initials-generator';
import {
  apiResponse,
  avatarConfig,
  avatarPalette,
  PDFRecryptOptions,
} from './types';
export type {PDFRecryptOptions,avatarConfig,avatarParams,avatarPalette,apiResponse} from './types';
const muhammara = require('muhammara');

/* PDFRecrypt */
export const fromBufferToBuffer = (
  buffer: Buffer,
  passwordOptions: PDFRecryptOptions
): string => {
  let response: string = '';
  try {
    const readStream = new muhammara.PDFRStreamForBuffer(buffer);
    const writeStream = new muhammara.PDFWStreamForBuffer();
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    return writeStream.buffer;
  } catch (error) {
    console.error(error);
    response = 'error';
  }
  return response;
};

export const fromFileToBuffer = (
  inputFilePath: string,
  passwordOptions: PDFRecryptOptions
): string => {
  let response: string = '';
  try {
    const readStream = new muhammara.PDFRStreamForFile(inputFilePath);
    const writeStream = new muhammara.PDFWStreamForBuffer();
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    response = writeStream.buffer;
  } catch (error) {
    console.error(error);
    response = 'error';
  }
  return response;
};

export const fromBufferToFile = (
  buffer: Buffer,
  outputFilePath: string,
  passwordOptions: PDFRecryptOptions
): string => {
  let response: string = '';
  try {
    const readStream = new muhammara.PDFRStreamForBuffer(buffer);
    const writeStream = new muhammara.PDFWStreamForFile(outputFilePath);
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    response = outputFilePath;
  } catch (error) {
    console.error(error);
    response = 'error';
  }
  return response;
};
export const fromFileToFile = (
  inputFilePath: string,
  outputFilePath: string,
  passwordOptions: PDFRecryptOptions
): string => {
  let response: string = '';
  try {
    const readStream = new muhammara.PDFRStreamForFile(inputFilePath);
    const writeStream = new muhammara.PDFWStreamForFile(outputFilePath);
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    response = outputFilePath;
  } catch (error) {
    console.error(error);
    response = 'error';
  }
  return response;
};

/* FIN PDFRecrypt */

/* Ajv logMessageErrors */
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
    } else if (error.keyword == 'uniqueItems') {
      let campo = error.instancePath.split('/');

      let msmTemp = '';
      msmTemp = `El campo '${campo[campo.length - 1]}' ${error.message}`;
      message = msmTemp;
    } else if (error.keyword == 'format') {
      let msmTemp = '';
      let campo = error.instancePath.split('/');
      let campoName = campo[campo.length - 1];

      if (parseInt(campoName) > 0) {
        campoName = `${campo[campo.length - 2]}[${campoName}]`;
      } else {
        campoName = campoName;
      }

      // console.log(campoName);

      msmTemp = `El campo '${campoName}' ${error.message}`;
      msmTemp = replaceAll(msmTemp, '"', "'");
      //msmTemp = msmTemp.replace('"', "'");
      message = msmTemp;
    } else if (error.keyword == 'enum') {
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

export const getPalette = (palette: avatarPalette = 'red'): string[] => {
  switch (palette) {
    case 'red':
      return ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'];
    case 'blue':
      return ['#0000ff', '#0000ff', '#0000ff', '#0000ff', '#0000ff'];
    case 'green':
      return ['#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00'];
    case 'yellow':
      return ['#ffff00', '#ffff00', '#ffff00', '#ffff00', '#ffff00'];
    case 'purple':
      return ['#ff00ff', '#ff00ff', '#ff00ff', '#ff00ff', '#ff00ff'];
    case 'orange':
      return ['#ffa500', '#ffa500', '#ffa500', '#ffa500', '#ffa500'];
    case 'pink':
      return ['#ff69b4', '#ff69b4', '#ff69b4', '#ff69b4', '#ff69b4'];
    case 'black':
      return ['#000000', '#000000', '#000000', '#000000', '#000000'];
    default:
      return ['#d97706', '#4f46e5', '#9333ea'];
  }
};

export const generateAvatar = (name: string, config?: avatarConfig): Buffer => {
  let _palette: string[] = getPalette(config?.palette);

  let _width: number = config?.width ? config?.width : 300;

  let _maxLetters: number = config?.maxLetters ? config?.maxLetters : 2;

  const avatar_buffer: Buffer = Avatar.generate(name, {
    width: _width,
    palette: _palette,
    maxLetters: _maxLetters,
    fontProportion: 0.6,
  });

  const b64: string = Buffer.from(avatar_buffer).toString('base64');

  var img: Buffer = Buffer.from(b64, 'base64');

  return img;
};
