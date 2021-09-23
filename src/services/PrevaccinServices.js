/* eslint-disable prettier/prettier */

import http from '../http-common';

const getAll = () => http.get('/prevaccin');

const get = (id) => http.get(`/prevaccin/${id}`);

const create = (data) => http.post('/prevaccin', data);

const update = (id, data) => http.put(`/prevaccin/${id}`, data);

const remove = (id) => http.delete(`/prevaccin/${id}`);

const getCount = () => http.get('/prevaccin/nombre');

const getDeb2j = () => http.get('/prevaccin/deb2j')
export default {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
  getDeb2j
};
