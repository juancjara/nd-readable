import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

import PostDetail from './PostDetail'
import Comments from './Comments'

/* should I fetch comments here? or in the Comments container */
class Post extends Component {
  render() {
    const { postId } = this.props
    return (
      <div>
        <Link to="/">
          <RaisedButton label="Back to posts" />
        </Link>
        <PostDetail postId={postId} />
        <Comments postId={postId} />
      </div>
    )
  }
}

export default withRouter(Post)
