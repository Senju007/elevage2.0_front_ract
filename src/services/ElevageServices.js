/* eslint-disable prettier/prettier */
import http from '../http-common';

const getAll = () => http.get('/elevage');

const get = (id) => http.get(`/elevage/${id}`);

const getPoulette = () => http.get('/poulette');

const getPondeuseI = () => http.get('/pondeuseI');

const getPondeuseII = () => http.get('/pondeuseII');

const getPondeuseIII = () => http.get('/pondeuseIII');

const create = (data) => http.post('/elevage', data);

const update = (id, data) => http.put(`/elevage/${id}`, data);

const remove = (id) => http.delete(`/elevage/${id}`);

const getCount = () => http.get('/elevage/nombre');

const getNourriture = (id) => http.get(`/elevage/nourriture/${id}`);

export default {
  getAll,
  get,
  getPoulette,
  getPondeuseI,
  getPondeuseII,
  getPondeuseIII,
  create,
  update,
  remove,
  getCount,
  getNourriture
};
