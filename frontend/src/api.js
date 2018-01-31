import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: '123456',
  },
})

const getData = ({ data }) => data

const vote = (id, option, url) =>
  instance.post(`${url}${id}`, { option }).then(getData)

const api = {
  getCategories: instance.get('/categories').then(getData),

  createComment: payload => instance.post('/comments/', payload).then(getData),
  updateComment: (id, payload) => instance.put(`/comments/${id}`, payload),
  deleteComment: id => instance.delete(`/comments/${id}`).then(getData),
  upVoteComment: id => vote(id, 'upVote', '/comments/'),
  downVoteComment: id => vote(id, 'downVote', '/comments/'),

  getComments: id => instance.get(`/posts/${id}/comments`).then(getData),
  getPosts: instance.get('/posts').then(getData),
  getPost: id => instance.get(`/posts/${id}`).then(getData),
  createPost: payload => instance.post('/posts/', payload),
  updatePost: (id, payload) => instance.put(`/posts/${id}`, payload),
  deletePost: id => instance.delete(`/posts/${id}`).then(getData),
  upVotePost: id => vote(id, 'upVote', '/posts/'),
  downVotePost: id => vote(id, 'downVote', '/posts/'),
}

export default api
