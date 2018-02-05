import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import Votes from 'components/Votes'

const Post = ({
  title,
  author,
  category,
  publishDate,
  id,
  upVotePost,
  downVotePost,
  voteScore,
  commentCount = 0,
  onDelete,
  onEdit,
}) => (
  <Card>
    <CardHeader title={title} subtitle={author} />
    <CardText>
      <Chip>{category}</Chip>
      Comments: {commentCount}
    </CardText>
    <Votes
      id={id}
      upVote={upVotePost}
      downVote={downVotePost}
      voteScore={voteScore}
    />
    <CardActions>
      <RaisedButton primary label="Edit" onClick={onEdit} />
      <RaisedButton secondary label="Delete" onClick={() => onDelete(id)} />
      <Link to={`${category}/${id}`}>
        <FlatButton label="See more" />
      </Link>
    </CardActions>
  </Card>
)

export default Post
