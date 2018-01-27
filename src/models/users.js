import queryString from 'query-string';
import * as usersService from '../services/users';
import { getTags } from 'wechat-api/lib/api_tag';

export default {
  namespace: 'users',
  state: {
    list: [],
    tags: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page, tags } }) {
      return { ...state, list, total, page, tags };
    }
  },
  effects: {
    *sync({ }, { call, put }) {
      const { data, headers } = yield call(usersService.sync);
      yield put({
        type: 'save',
        payload: {
          data
        },
      });
    },
    *getTags({ }, { call, put }) {
      const { data, headers } = yield call(usersService.getTags);
      yield put({
        type: 'save',
        payload: {
          tags: data
        },
      });
    },
    *send({ payload: { to, totag, message } }, { call, put }) {
      console.info('*send', to, totag, message);
      const { data, headers } = yield call(usersService.send, { to, totag, message });
    },
    *search({ payload: { query = '' } }, { call, put }) {
      const { data, headers } = yield call(usersService.search, { query });
      yield put({
        type: 'save',
        payload: {
          data
        },
      });
    },
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        // console.info('model_setup_query', query);
        if (query.type === 'tags') {
          dispatch({ type: 'getTags', payload: query });
        }
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
