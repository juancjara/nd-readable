import { createTypes, createAction, createReducer, formatList } from '../utils'

//types
const TYPES = createTypes({
  prefix: 'categories',
  constants: ['REQUEST', 'SUCCESS', 'ERROR'],
})

//actions
const categoriesRequest = createAction(TYPES.REQUEST)
const categoriesRequestSuccess = createAction(TYPES.SUCCESS, 'categories')

export const fetchCategories = () => (dispatch, _, api) => {
  dispatch(categoriesRequest())
  api.getCategories.then(({ categories }) => {
    dispatch(categoriesRequestSuccess(categories))
  })
}

//selectors
export const getCategories = state =>
  state.categories.ids.map(id => state.categories.items[id])

const initialState = {
  ids: [],
  items: {},
  isFetching: true,
  hasData: false,
}

export default createReducer(initialState, {
  [TYPES.SUCCESS](state, { categories }) {
    return {
      ...state,
      hasData: true,
      isFetching: false,
      ...formatList(categories, 'path'),
    }
  },
  [TYPES.REQUEST](state) {
    return { ...state, isFetching: true }
  },
})
