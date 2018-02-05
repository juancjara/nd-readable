import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { downVotePost, upVotePost, deletePost, updatePost } from 'Posts/ducks'

import Preview from 'Posts/components/Preview'
import Edit from 'Posts/components/Edit'

class Post extends Component {
  state = { isOpen: false }
  openModal = () => this.setState({ isOpen: true })
  closeModal = () => this.setState({ isOpen: false })
  onDelete = () => {
    const { deletePost, post: { id } } = this.props
    deletePost(id)
  }

  render() {
    const { isOpen } = this.state
    const { post, upVotePost, downVotePost, updatePost } = this.props

    return (
      <div>
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
        <Preview
          {...post}
          downVotePost={downVotePost}
          upVotePost={upVotePost}
          onDelete={this.onDelete}
          onEdit={this.openModal}
        />
      </div>
    )
  }
}

export default connect(null, {
  updatePost,
  downVotePost,
  upVotePost,
  deletePost,
})(Post)
