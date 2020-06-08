import _superagent from "superagent";
import superagentIntercept from "superagent-intercept";

import Constants from '../Constants';
import { resolveOnStorage, saveOnStorage } from "../helpers/utils";

const superagent = _superagent;

let jwtToken = resolveOnStorage(Constants.JwtToken);

const headers = (req) => {
  let headers = { 'Accept-Language': 'pt-br', 'Content-Type': 'application/json' };
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`;
  }

  Object.keys(headers).forEach(e => {
    req.set(e, headers[e]);
  });
};

const interceptors = (err, res) => {
  // tratar armazenamento de token
  if (!err && res.req && res.req.url.endsWith('/api/auth') && res.body && res.body.token) {
    jwtToken = res.body.token;
    saveOnStorage(Constants.JwtToken, jwtToken);
    saveOnStorage(Constants.UserRoles, res.body.claims.authorities);
  }

  // // tratar renovação de token
  if (!err && res.headers['Renew-JWT']) {
    saveOnStorage(Constants.JwtToken, res.headers['Renew-JWT']);
  }

  // tratar sessão expirada
  if (err?.status === 401 && res?.body?.message === 'E_SESSION_EXPIRED') {
    window.location = '/login';
  }
};

// TODO: tratamento de erro depois aqui, tem que ver junto com o backend
const onError = err => {
  throw err;
};

const applyCustoms = req => req.use(headers).use(superagentIntercept(interceptors)).catch(err => onError(err));

export default {
  del: url => applyCustoms(superagent.del(`${Constants.ApiBasePath}${url}`)),
  get: url => applyCustoms(superagent.get(`${Constants.ApiBasePath}${url}`)),
  put: (url, body) => applyCustoms(superagent.put(`${Constants.ApiBasePath}${url}`, body)),
  patch: (url, body) => applyCustoms(superagent.patch(`${Constants.ApiBasePath}${url}`, body)),
  post: (url, body) => applyCustoms(superagent.post(`${Constants.ApiBasePath}${url}`, body)),
  custom: (method, url, body, extraHeaders = {}) => {
    const req = superagent(method, `${Constants.ApiBasePath}${url}`);
    if (extraHeaders) {
      Object.keys(extraHeaders).forEach((e) => {
        req.set(e, extraHeaders[e]);
      });
    }
    if (body) {
      req.send(body);
    }
    return applyCustoms(req);
  }
};
