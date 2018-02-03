import React from 'react'
import Chip from 'material-ui/Chip'
import fecha from 'fecha'

import Votes from 'components/Votes'

const PostDetail = ({
  title,
  body,
  author,
  category,
  timestamp,
  id,
  upVotePost,
  downVotePost,
  voteScore,
  comments,
}) => (
  <div>
    <h2>{title}</h2>
    <h4>
      By {author} , {fecha.format(timestamp, 'hh:mm:ss A YYYY/MM/DD')}
    </h4>
    <Chip>{category}</Chip>
    <p>{body}</p>
    <Votes
      id={id}
      upVote={upVotePost}
      downVote={downVotePost}
      voteScore={voteScore}
    />
  </div>
)

export default PostDetail
