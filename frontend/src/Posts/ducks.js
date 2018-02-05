import _ from 'lodash'
import uuidv4 from 'uuid/v4'

import { createTypes, createAction, createReducer, formatList } from '../utils'

const noop = () => null

const TYPES = createTypes({
  prefix: 'posts',
  constants: ['REQUEST', 'SUCCESS', 'ERROR', 'UPDATE', 'ADD', 'DELETE'],
})

//actions
const request = createAction(TYPES.REQUEST)
const requestSuccess = createAction(TYPES.SUCCESS, 'posts')
const _updatePost = createAction(TYPES.UPDATE, 'id', 'prop', 'value')
const addPost = createAction(TYPES.ADD, 'post')
const deletePostSuccess = createAction(TYPES.DELETE, 'id')

export const updatePost = (id, payload, cb) => (dispatch, _, api) => {
  dispatch(request())
  api.updatePost(id, payload).then(res => {
    dispatch(_updatePost(id, 'title', payload.title))
    dispatch(_updatePost(id, 'body', payload.body))
    cb()
  })
}

export const deletePost = (id, cb = noop) => (dispatch, _, api) => {
  dispatch(request())
  api.deletePost(id).then(res => {
    dispatch(deletePostSuccess(id))
    cb()
  })
}

export const createPost = values => (dispatch, _, api) => {
  dispatch(request())
  const payload = {
    ...values,
    id: uuidv4(),
    timestamp: Date.now(),
  }

  api.createPost(payload).then(res => dispatch(addPost({ ...payload, ...res })))
}

export const fetchPosts = () => (dispatch, getState, api) => {
  if (getState().posts.hasData) {
    return
  }
  dispatch(request())
  api.getPosts.then(posts => dispatch(requestSuccess(posts)))
}

export const fetchPost = id => (dispatch, getState, api) => {
  const hasPost = Object.keys(getPost(getState(), id)).length
  if (hasPost) {
    return
  }
  dispatch(request())

  api.getPost(id).then(post => dispatch(requestSuccess([post])))
}

export const upVotePost = id => (dispatch, _, api) => {
  api.upVotePost(id).then(({ voteScore }) => {
    dispatch(_updatePost(id, 'voteScore', voteScore))
  })
}

export const downVotePost = id => (dispatch, _, api) => {
  api.downVotePost(id).then(({ voteScore }) => {
    dispatch(_updatePost(id, 'voteScore', voteScore))
  })
}

//selectors
export const isLoading = state => state.posts.isFetching
export const getPosts = (state, category) =>
  state.posts.ids
    .map(id => state.posts.items[id])
    .filter(post => (category ? category === post.category : true))
export const getPost = (state, id) => {
  if (id in state.posts.items) {
    return state.posts.items[id]
  }
  return {}
}

const initialState = {
  ids: [],
  items: {},
  isFetching: true,
  hasData: false,
}

export default createReducer(initialState, {
  [TYPES.ADD](state, { post }) {
    return {
      ...state,
      isFetching: false,
      ids: state.ids.concat(post.id),
      items: {
        ...state.items,
        [post.id]: post,
      },
    }
  },
  [TYPES.DELETE](state, { id }) {
    return {
      ...state,
      isFetching: false,
      ids: state.ids.filter(i => i !== id),
      items: _.omit(state.items, id),
    }
  },
  [TYPES.SUCCESS](state, { posts }) {
    return {
      ...state,
      hasData: true,
      isFetching: false,
      ...formatList(posts, 'id'),
    }
  },
  [TYPES.REQUEST](state) {
    return { ...state, isFetching: true }
  },
  [TYPES.UPDATE](state, { id, prop, value }) {
    return {
      ...state,
      isFetching: false,
      items: { ...state.items, [id]: { ...state.items[id], [prop]: value } },
    }
  },
})
