import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'

import Votes from 'components/Votes'

const Post = ({
  title,
  author,
  category,
  publishDate,
  id,
  deletePost,
  upVotePost,
  downVotePost,
  voteScore,
}) => (
  <Card>
    <CardHeader title={title} subtitle={author} />
    <CardText>
      <Chip>{category}</Chip>
    </CardText>
    <Votes
      id={id}
      upVote={upVotePost}
      downVote={downVotePost}
      voteScore={voteScore}
    />
    <CardActions>
      <Link to={`/post/${id}`}>
        <FlatButton label="See more" />
      </Link>
    </CardActions>
  </Card>
)

export default Post
