import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

import PostDetail from './PostDetail'
import Comments from './Comments'
import { isValidPost } from 'Posts/ducks'

/* should I fetch comments here? or in the Comments container */
class Post extends Component {
  render() {
    const { postId, isValidPost } = this.props
    return (
      <div>
        <Link to="/">
          <RaisedButton label="Back to posts" />
        </Link>
        {!isValidPost && <h3>The post is not longer available</h3>}
        {isValidPost && <PostDetail postId={postId} />}
        {isValidPost && <Comments postId={postId} />}
      </div>
    )
  }
}

const mapState = (state, { id }) => ({
  isValidPost: isValidPost(state, id),
})

export default withRouter(connect(mapState)(Post))
