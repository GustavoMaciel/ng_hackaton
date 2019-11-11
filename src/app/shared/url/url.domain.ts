'use strict';

export const API_VERSION = 'v1';

/**
 * Default URL of the back-end server.
 *
 * @type {string}
 */

//export const SERVER_URL = 'http://' + document.location.hostname + ':8080/hackathon-backend/api/v1/';
export const SERVER_URL = 'http://localhost:8080/hackathon-backend/api/v1/';

export class PessoaURL {
  static BASE = 'pessoas';
  static EDIT_PESSOA = PessoaURL.BASE + '/edit/';
  static VIEW_PESSOA = PessoaURL.BASE + '/';
  static DELETE_PESSOA = PessoaURL.BASE + '/delete/';
}

export class EmpresaURL {
  static BASE = 'empresas';
  static VIEW_EMPRESA = SERVER_URL + EmpresaURL.BASE + '/';
  static EDIT_EMPRESA = SERVER_URL + EmpresaURL.BASE + '/edit/';
  static DELETE_EMPRESA = SERVER_URL + EmpresaURL.BASE + '/delete/';
}

export class ProdutoURL {
 static BASE = 'produtos';
 static EDIT_PRODUTO = SERVER_URL + ProdutoURL.BASE + '/edit/';
 static VIEW_PRODUTO = SERVER_URL + ProdutoURL.BASE + '/';
 static DELETE_PRODUTO = SERVER_URL + ProdutoURL.BASE + '/delete/';
}