import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function sync() {
  return request(`/api/users`, {
    method: 'POST'
  });
}
export function getTags() {
  return request(`/api/tags`, {
    method: 'GET'
  });
}
export function search({ query }) {
  return request(`/api/users?search=${query}`);
}
export function send({ to, totag, message }) {
  console.info('send__', { to, totag, message });
  return request(`/api/send`, {
    method: 'POST',
    body: JSON.stringify({ to, totag, message })
  });
}
export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
