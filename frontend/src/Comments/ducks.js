import _ from 'lodash'
import uuidv4 from 'uuid/v4'

import { createTypes, createAction, createReducer, formatList } from '../utils'

const TYPES = createTypes({
  prefix: 'comments',
  constants: ['REQUEST', 'SUCCESS', 'ERROR', 'UPDATE', 'ADD', 'DELETE'],
})

//actions
const request = createAction(TYPES.REQUEST)
const requestSuccess = createAction(TYPES.SUCCESS, 'comments')
const _updateComment = createAction(TYPES.UPDATE, 'id', 'prop', 'value')
const addComment = createAction(TYPES.ADD, 'comment')
const deleteCommentSuccess = createAction(TYPES.DELETE, 'id')

//action thunk
export const fetchComments = id => (dispatch, _, api) => {
  dispatch(request())
  api.getComments(id).then(comments => dispatch(requestSuccess(comments)))
}

export const deleteComment = id => (dispatch, _, api) => {
  dispatch(request())
  api.deleteComment(id).then(res => {
    dispatch(deleteCommentSuccess(id))
  })
}

export const updateVote = method => id => (dispatch, _, api) => {
  api[method](id).then(({ voteScore }) => {
    dispatch(_updateComment(id, 'voteScore', voteScore))
  })
}

export const upVoteComment = updateVote('upVoteComment')
export const downVoteComment = updateVote('downVoteComment')

export const updateComment = (id, data, cb) => (dispatch, _, api) => {
  dispatch(request())
  const payload = {
    ...data,
    timestamp: Date.now(),
  }

  api.updateComment(id, payload).then(res => {
    dispatch(_updateComment(id, 'timestamp', payload.timestamp))
    dispatch(_updateComment(id, 'body', payload.body))
    cb()
  })
}

export const createComment = (postId, data) => (dispatch, _, api) => {
  const payload = {
    ...data,
    parentId: postId,
    id: uuidv4(),
    timestamp: Date.now(),
  }
  api
    .createComment(payload)
    .then(res => dispatch(addComment({ ...payload, ...res })))
}

// selectors
export const isLoading = state => state.comments.isFetching
export const getComments = state =>
  state.comments.ids.map(id => state.comments.items[id])

const initialState = {
  ids: [],
  items: {},
  isFetching: false,
  hasData: false,
}

export default createReducer(initialState, {
  [TYPES.ADD](state, { comment }) {
    return {
      ...state,
      isFetching: false,
      ids: state.ids.concat(comment.id),
      items: {
        ...state.items,
        [comment.id]: comment,
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
  [TYPES.SUCCESS](state, { comments }) {
    return {
      ...state,
      hasData: true,
      isFetching: false,
      ...formatList(comments, 'id'),
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
