import { ErrorObject } from "ajv";
import localize_es from "ajv-i18n/localize/es";

/* transformar los log de ajv */
export function logMessageErrors(
  errors: ErrorObject[] | null | undefined
): string {
  localize_es(errors);
  let message: string = "";

  // console.log(errors);

  if (errors !== undefined && errors !== null) {
    let error = errors[0];

    if (error.keyword === "required") {
      let msmTemp = "";
      let campo = error.params.missingProperty;
      msmTemp = `El campo '${campo}' es obligatorio`;
      message = msmTemp;
    } else if (error.keyword == "uniqueItems") {
      let campo = error.instancePath.split("/");

      let msmTemp = "";
      msmTemp = `El campo '${campo[campo.length - 1]}' ${error.message}`;
      message = msmTemp;
    } else if (error.keyword == "format") {
      let msmTemp = "";
      let campo = error.instancePath.split("/");
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
    } else if (error.keyword == "enum") {
      let msmTemp = "";
      let campo = error.instancePath.split("/");

      let allowedValues = traformsArray(error.params.allowedValues);
      msmTemp = `El campo '${campo[campo.length - 1]}' ${
        error.message
      }:${allowedValues}`;
      message = msmTemp;
    } else {
      let msmTemp = "";
      let campo = error.instancePath.split("/");

      msmTemp = `El campo '${campo[campo.length - 1]}' ${error.message}`;
      message = msmTemp;
    }
  } else {
    message = "";
  }

  return message;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function replaceAll(str: string, match: string, replacement: string) {
  return str.replace(new RegExp(escapeRegExp(match), "g"), () => replacement);
}
/* tranformar un array */
export function traformsArray(allowedValues: []): string {
  let cont = 0;

  let _allowedValues: any = allowedValues.map((item: string) => {
    let _item = "";
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

  _allowedValues = replaceAll(_allowedValues, ", ,", ",");

  return _allowedValues;
}
