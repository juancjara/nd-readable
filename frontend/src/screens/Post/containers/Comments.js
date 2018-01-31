import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import RaisedButton from 'material-ui/RaisedButton'
import Modal from 'react-modal'

import Comment from 'Comments/components/View'
import CreateComment from 'Comments/components/Create'

import {
  createComment,
  fetchComments,
  isLoading,
  getComments,
  deleteComment,
  updateComment,
  upVoteComment,
  downVoteComment,
} from 'Comments/ducks'

class Comments extends Component {
  state = { isOpen: false, editInitialValues: null }
  openModal = (editInitialValues = null) =>
    this.setState({ isOpen: true, editInitialValues })
  closeModal = () => this.setState({ isOpen: false, editInitialValues: null })
  componentDidMount() {
    this.props.fetchComments(this.props.id)
  }
  handleSubmit = values => {
    const { updateComment, createComment } = this.props
    if (this.state.editInitialValues) {
      const {
        id,
        ...rest,
      } = values;
      updateComment(id, rest, this.closeModal)
    } else {
      createComment(this.props.id, values)
      this.closeModal()
    }
  }
  render() {
    const { isOpen, editInitialValues } = this.state
    const { loading, comments, deleteComment, upVoteComment, downVoteComment } = this.props

    if (loading) return <div>Loading Comments...</div>

    return (
      <div>
        {comments.map(c => (
          <Comment
            {...c}
            key={c.id}
            onRemove={deleteComment}
            onEdit={initialValues => this.openModal(initialValues)}
            upVote={upVoteComment}
            downVote={downVoteComment}
          />
        ))}
        {!comments.length && <div>There are no comments yet</div>}
        <RaisedButton label="Add comment" onClick={() => this.openModal()} />
        <Modal
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
        >
          <CreateComment
            initialValues={editInitialValues}
            onCancel={this.closeModal}
            onSubmit={this.handleSubmit}
          />
        </Modal>
      </div>
    )
  }
}

const mapState = (state, { match: { params: { id } } }) => ({
  loading: isLoading(state),
  comments: getComments(state),
  id,
})

const mapDispatch = {
  fetchComments,
  createComment,
  deleteComment,
  updateComment,
  upVoteComment,
  downVoteComment,
}

export default compose(withRouter, connect(mapState, mapDispatch))(Comments)
