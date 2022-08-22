//const muhammara = require('muhammara');
import { PDFRecryptOptions } from '../types/pdfence';
import * as muhammara from 'muhammara';
/**
 * @description Recrypt a PDF file
 *
 * @param {Buffer} buffer - Path to the input file
 * @param {PDFRecryptOptions} passwordOptions - Options for the recryption
 * @returns {Promise<any> | string}
 */
export const fromBufferToBuffer = (
  buffer: Buffer,
  passwordOptions: PDFRecryptOptions
): Promise<any> | string => {
  try {
    const readStream = new muhammara.PDFRStreamForBuffer(buffer);
    const writeStream = new muhammara.PDFWStreamForBuffer();
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    return writeStream.buffer;
  } catch (error) {
    console.error(error);
    return 'error';
  }
};
/**
 * @description Recrypt a PDF file
 *
 * @param {string} inputFilePath - Path to the input file
 * @param {PDFRecryptOptions} passwordOptions - Options for the recryption
 * @returns {Promise<any> | string}
 */
export const fromFileToBuffer = (
  inputFilePath: string,
  passwordOptions: PDFRecryptOptions
): Promise<any> | string => {
  try {
    const readStream = new muhammara.PDFRStreamForFile(inputFilePath);
    const writeStream = new muhammara.PDFWStreamForBuffer();
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    return writeStream.buffer;
  } catch (error) {
    console.error(error);
    return 'error';
  }
};
/**
 * @description Recrypt a PDF file
 *
 * @param {Buffer} buffer - Path to the input file
 * @param {string} outputFilePath - Path to the output file
 * @param {PDFRecryptOptions} passwordOptions - Options for the recryption
 * @returns {Promise<any> | string}
 */
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
/**
 * @description Recrypt a PDF file
 *
 * @param {string} inputFilePath - Path to the input file
 * @param {string} outputFilePath - Path to the output file
 * @param {PDFRecryptOptions} passwordOptions - Options for the recryption
 * @returns {Promise<any> | string}
 */
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
