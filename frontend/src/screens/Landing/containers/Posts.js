import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Modal from 'react-modal'

import { getCategories } from 'Categories/ducks'
import {
  getPosts,
  fetchPosts,
  createPost,
  downVotePost,
  upVotePost,
} from 'Posts/ducks'
import Preview from 'Posts/components/Preview'

import CreatePost from 'Posts/components/Create'

class Posts extends Component {
  state = { isOpen: false }

  componentDidMount() {
    this.props.fetchPosts()
  }

  openModal = () => this.setState({ isOpen: true })
  closeModal = () => this.setState({ isOpen: false })

  render() {
    const {
      posts,
      createPost,
      categories,
      downVotePost,
      upVotePost,
    } = this.props
    const { isOpen } = this.state

    return (
      <div>
        {posts.map(post => (
          <Preview
            {...post}
            key={post.id}
            downVotePost={downVotePost}
            upVotePost={upVotePost}
          />
        ))}
        <RaisedButton
          onClick={this.openModal}
          label="new post"
          labelPosition="before"
          primary={true}
          icon={<AddIcon />}
        />
        <Modal
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
        >
          {/** should I pass categories as props or should I connect CreatePost component.
           * Also, should should Modal be in this level or in the component, I think if I used
           * it at this level, I could reuse CreatePost component as a page maybe or
           * something like that
           * **/}
          <CreatePost
            onCancel={this.closeModal}
            onSubmit={values => {
              createPost(values)
              this.closeModal()
            }}
            categories={categories}
          />
        </Modal>
      </div>
    )
  }
}

const mapState = (state, { category }) => ({
  posts: getPosts(state, category),
  categories: getCategories(state).map(c => c.name),
})

const mapDispatch = { fetchPosts, createPost, downVotePost, upVotePost }

export default withRouter(connect(mapState, mapDispatch)(Posts))
