import request from '../utils/request';

export function fetch() {
  return request(`/api/admins`);
}

export function remove(id) {
  return request(`/api/admin`, {
    method: 'DELETE',
    body: JSON.stringify(id)
  });
}

export function patch(values) {
  return request(`/api/admin`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/admins', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}
