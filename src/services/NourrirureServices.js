/* eslint-disable prettier/prettier */

import http from '../http-common';

const getAll = () => http.get('/nourriture');

const get = (id) => http.get(`/nourriture/${id}`);

const create = (data) => http.post('/nourriture', data);

const update = (id, data) => http.put(`/nourriture/${id}`, data);

const remove = (id) => http.delete(`/nourriture/${id}`);

const getCount = () => http.get('/nourriture/nombre');

const getFn2j = () => http.get('/nourriture/fin2j')
export default {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
  getFn2j
};
