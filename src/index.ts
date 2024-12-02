/**
 * @description type
 */
export { PDFRecryptOptions } from './types/pdfence';
export { avatarConfig, avatarParams, avatarPalette } from './types/avatar';
export {
  IpInfo,
  Middleware,
  Authorize,
  AuthorizeAuth0,
  ReqController,
  ReqControllerParamsQuery,
  ReqControllerParamsBody,
  ReqControllerParams,
  ReqControllerQuery,
} from './types/express';
export { apiResponse, modelsResponse } from './types/utils';
export {
  WhatsappAudioNotification,
  WhatsappContactNotification,
  WhatsappDocumentNotification,
  WhatsappImageNotification,
  WhatsappLocationNotification,
  WhatsappMessageNotification,
  WhatsappNotification,
  WhatsappStickerNotification,
  WhatsappVideoNotification,
  WhatsappContactRequest,
  WhatsappLocationRequest,
  WhatsappAudioRequest,
  WhatsappDocumentRequest,
  WhatsappMessageRequest,
  WhatsappStickerRequest,
  WhatsappVideoRequest,
  WhatsappImageRequest,
} from './types/notification';
export {
  IMailOptions,
  _IMailOptions,
  MailServiceResponse,
  SMTPTransportOptions,
  Attachment,
  Attachments,
} from './types/mail';

/**
 * @description lib
 */
export {
  generateAvatar,
  getPalette,
  toArrayBuffer,
  toBuffer,
} from './lib/avatar';
export {
  logMessageErrors,
  validateBodyRequest,
  validateParamsRequest,
  validateQueryRequest,
  parse,
  queryParser,
  escape_inyection,
  parse_inyection,
} from './lib/ajv';

export {
  getIpInfoMiddleware,
  getIpInfo,
  cleanSqlInjection,
  noHeaderInfo,
} from './lib/express';
export {
  base64MimeType,
  callApi,
  convCronomet,
  convertirBoolean,
  detectMimeType,
  getAccessTypes,
  getCodAleatorio,
  getKilometros,
  generateUid,
  getPlatform,
  getProm,
  isEmptyArray,
  ImgCode,
  limpiar,
  lowerKeys,
  obtenerClave,
  obtenerPassTemp,
  randonAuth,
  replaceAll,
  roundDs,
  saveExternalFile,
  traformsArray,
} from './lib/utils';
export {
  fromBufferToBuffer,
  fromBufferToFile,
  fromFileToBuffer,
  fromFileToFile,
} from './lib/pdfence';

export { callWhatsappOnlyApi } from './lib/notification';
export { calcularDigitoVerificacion } from './lib/dian';
/**
 * @description services
 */
export { ResponseTraitService } from './lib/responsetrait.service';
export { MailService } from './lib/mail.service';
