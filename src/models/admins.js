import queryString from 'query-string';
import * as adminsService from '../services/admins';

export default {
  namespace: 'admins',
  state: {
    list: []
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list };
    },
  },
  effects: {
    *fetch({ payload: { } }, { call, put }) {
      const { data, headers } = yield call(adminsService.fetch);
      yield put({
        type: 'save',
        payload: {
          data
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(adminsService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: values }, { call, put }) {
      yield call(adminsService.patch, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(adminsService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.sections);
      yield put({ type: 'fetch', payload: {  } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        // if (pathname === '/dashboard/') {
        //   dispatch({ type: 'fetch', payload: query });
        // }
        dispatch({ type: 'fetch', payload: query });
      });
    },
  },
};
