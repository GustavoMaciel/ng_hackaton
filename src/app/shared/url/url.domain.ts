'use strict';

export const API_VERSION = 'v1';

/**
 * Default URL of the back-end server.
 *
 * @type {string}
 */
export const SERVER_URL = 'http://' + document.location.hostname + ':8080/api/' + API_VERSION + '/';
// export const SERVER_URL = 'https://' + document.location.hostname + ':5001/api/' + API_VERSION + '/';

export namespace LoginURL {
  export const BASE = 'login';
  export const REFRESH_TOKEN = 'refresh';
}

export namespace UserURL {
  export const BASE = 'user';
  export const CHANGE_PASSWORD = 'change-password'
}

export namespace PessoaURL {
  export const BASE = 'pessoa';
}

export namespace EmpresaURL {
  export const BASE = 'empresa';
}

export namespace ProdutoURL {
  export const BASE = 'produto';
}