enum StatusCode {
  statusOk = 200,
  statusCreate = 201,
  statusNoConte = 204,
  Unauthorized = 401,
  badReq = 400,
  Forbidden = 403,
  NoFound = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

/**
 * @description Response trait for express
 */
export class ResponseTraitService {
  private respond = (
    data?: any,
    status: number = StatusCode.statusOk,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) => {
    if (
      status === StatusCode.statusOk ||
      status === StatusCode.statusCreate ||
      status === StatusCode.statusNoConte
    ) {
      if (isData === true && showError === false) {
        return {
          code: status,
          success: true,
          total: data.length === 0 ? 1 : data.length || 0 || 0,
          messages: {
            success: message ? message : 'Success',
          },
          [propiedad]: data,
        };
      } else if (isData === true && showError === true) {
        return {
          code: status,
          success: true,
          total: data.length === 0 ? 1 : data.length || 0,
          messages: {
            success: message ? message : 'Success',
          },
          [propiedad]: data,
          error: error ? error : null,
        };
      } else if (isData === false && showError === true) {
        return {
          code: status,
          success: true,
          messages: {
            success: message ? message : 'Success',
          },
          error: error ? error : null,
        };
      } else {
        return {
          code: status,
          success: true,
          messages: {
            success: message ? message : 'Success',
          },
        };
      }
    } else {
      if (isData === true && showError === false) {
        return {
          code: status,
          success: false,
          messages: {
            error: message ? message : 'Error',
          },
          [propiedad]: [],
        };
      } else if (isData === false && showError === true) {
        return {
          code: status,
          success: false,
          messages: {
            error: message ? message : 'Error',
          },
          error: error ? error : null,
        };
      } else {
        return {
          code: status,
          success: false,
          messages: {
            error: message ? message : 'Error',
          },
        };
      }
    }
  };

  public response(
    data: any,
    status: number = StatusCode.statusOk,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public respondCreated(
    data: any,
    status: number = StatusCode.statusCreate,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public respondDeleted(
    data: any,
    status: number = StatusCode.statusOk,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public respondUpdated(
    data: any,
    status: number = StatusCode.statusOk,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public respondNoContent(
    data: any,
    status: number = StatusCode.statusNoConte,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public failUnauthorized(
    data: any,
    status: number = StatusCode.Unauthorized,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public failForbidden(
    data: any,
    status: number = StatusCode.Forbidden,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public failNotFound(
    data: any,
    status: number = StatusCode.NoFound,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public failValidationError(
    data: any,
    status: number = StatusCode.InternalServerError,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
  public failTooManyRequests(
    data: any,
    status: number = 400,
    message: string = '',
    propiedad: string = 'data',
    isData: boolean = true,
    showError: boolean = false,
    error: Error | unknown = null
  ) {
    return this.respond(
      data,
      status,
      message,
      propiedad,
      isData,
      showError,
      error
    );
  }
}
