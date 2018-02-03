import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Modal from 'react-modal'

import {
  isLoading,
  getPost,
  fetchPosts,
  upVotePost,
  downVotePost,
  deletePost,
  updatePost,
} from 'Posts/ducks'
import Detail from 'Posts/components/Detail'
import Edit from 'Posts/components/Edit'

class PostDetail extends Component {
  state = { isOpen: false }

  componentDidMount() {
    this.props.fetchPosts()
  }
  openModal = () => this.setState({ isOpen: true })
  closeModal = () => this.setState({ isOpen: false })

  redirect = () => {
    this.props.history.replace('/')
  }
  render() {
    const { isOpen } = this.state
    const {
      loading,
      post,
      updatePost,
      upVotePost,
      downVotePost,
      deletePost,
    } = this.props
    const events = {
      upVotePost,
      downVotePost,
    }

    return loading ? (
      <div>loading</div>
    ) : (
      <div>
        <Detail {...post} {...events} />
        <RaisedButton primary label="Edit" onClick={this.openModal} />
        <Modal
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
        >
          <Edit
            {...post}
            onCancel={this.closeModal}
            onSubmit={values => {
              updatePost(post.id, values, this.closeModal)
            }}
          />
        </Modal>

        <RaisedButton
          secondary
          label="Delete"
          onClick={() => deletePost(post.id, this.redirect)}
        />
      </div>
    )
  }
}

const mapState = (state, { match: { params: { id } } }) => ({
  loading: isLoading(state),
  post: getPost(state, id),
  postId: id,
})

const mapDispatch = {
  fetchPosts,
  upVotePost,
  downVotePost,
  deletePost,
  updatePost,
}

export default withRouter(connect(mapState, mapDispatch)(PostDetail))
