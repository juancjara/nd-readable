import _ from 'lodash'

export const createTypes = ({ prefix, constants }) =>
  constants
    .reduce((acc, type) => ({...acc, [type]: `${prefix}|${type}`}), {});

export const createAction = (type, ...rest) => (...params) => ({
  type,
  payload: params.reduce((acc, param, i) => ({...acc, [rest[i]]: param}), {}),
}); 

export const createReducer = (initialState, handlers) => (state, action) => {
  if (state === undefined) state = initialState;

  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action.payload);
  }
  return state;
}

export const formatList = (list, key) => ({
  items: _.keyBy(list, key),
  ids: _.map(list, key),
});

