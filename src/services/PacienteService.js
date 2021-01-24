import http from '../utils/http-common';

const getAll = (params) => {
  return http.get('/people', { params });
};

const get = (id) => {
  return http.get(`/people/${id}`);
};

const create = (data) => {
  return http.post('/people', data);
};

const update = (id, data) => {
  return http.put(`/people/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/people/${id}`);
};

const removeAll = () => {
  return http.delete('/people');
};

const findByTitle = (title) => {
  return http.get(`/people?nombre=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
