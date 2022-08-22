const muhammara = require('muhammara');
import { PDFRecryptOptions } from '../types/pdfence';

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
