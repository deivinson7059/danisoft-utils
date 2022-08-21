import { PDFRecryptOptions } from "./types/pdfence";

const muhammara = require("muhammara");

export async function fromBufferToBuffer(
  buffer: Buffer,
  passwordOptions: PDFRecryptOptions
): Promise<string> {
  let response: string = "";
  try {
    const readStream = new muhammara.PDFRStreamForBuffer(buffer);
    const writeStream = new muhammara.PDFWStreamForBuffer();
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    return writeStream.buffer;
  } catch (error) {
    console.error(error);
    response = "error";
  }
  return response;
}

export async function fromFileToBuffer(
  inputFilePath: string,
  passwordOptions: PDFRecryptOptions
): Promise<string> {
  let response: string = "";
  try {
    const readStream = new muhammara.PDFRStreamForFile(inputFilePath);
    const writeStream = new muhammara.PDFWStreamForBuffer();
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    response = writeStream.buffer;
  } catch (error) {
    console.error(error);
    response = "error";
  }
  return response;
}

export async function fromFileToFile(
  inputFilePath: string,
  outputFilePath: string,
  passwordOptions: PDFRecryptOptions
): Promise<string> {
  let response: string = "";
  try {
    const readStream = new muhammara.PDFRStreamForFile(inputFilePath);
    const writeStream = new muhammara.PDFWStreamForFile(outputFilePath);
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    response = outputFilePath;
  } catch (error) {
    console.error(error);
    response = "error";
  }
  return response;
}

export async function fromBufferToFile(
  buffer: Buffer,
  outputFilePath: string,
  passwordOptions: PDFRecryptOptions
): Promise<string> {
  let response: string = "";
  try {
    const readStream = new muhammara.PDFRStreamForBuffer(buffer);
    const writeStream = new muhammara.PDFWStreamForFile(outputFilePath);
    muhammara.recrypt(readStream, writeStream, passwordOptions);
    response = outputFilePath;
  } catch (error) {
    console.error(error);
    response = "error";
  }
  return response;
}
