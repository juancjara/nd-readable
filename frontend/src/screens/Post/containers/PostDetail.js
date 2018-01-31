import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import {
  isLoading,
  getPost,
  fetchPost,
  upVotePost,
  downVotePost,
  deletePost,
} from 'Posts/ducks'
import Detail from 'Posts/components/Detail'

class PostDetail extends Component {
  componentDidMount() {
    const { postId, fetchPost } = this.props
    fetchPost(postId)
  }
  redirect = () => {
    this.props.history.replace('/')
  }
  render() {
    const { loading, post, upVotePost, downVotePost, deletePost } = this.props
    const events = {
      upVotePost,
      downVotePost,
    }

    return loading ? (
      <div>loading</div>
    ) : (
      <div>
        <Detail {...post} {...events} />
        <RaisedButton primary label="Edit" />
        <RaisedButton
          secondary
          label="Delete"
          onClick={() => deletePost(post.id, this.redirect)}
        />
      </div>
    )
  }
}

const mapState = (state, { postId }) => ({
  loading: isLoading(state),
  post: getPost(state, postId),
})

const mapDispatch = {
  fetchPost,
  upVotePost,
  downVotePost,
  deletePost,
}

export default connect(mapState, mapDispatch)(PostDetail)
