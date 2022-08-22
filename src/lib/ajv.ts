import { ErrorObject } from 'ajv';
import localize_es from 'ajv-i18n/localize/es';
import { replaceAll, traformsArray } from './utils';

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
