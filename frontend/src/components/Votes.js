import React from 'react'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'

const Votes = ({ id, upVote, downVote, voteScore }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <IconButton onClick={() => upVote(id)}>
      <ThumbUp />
    </IconButton>
    <div>{voteScore}</div>
    <IconButton onClick={() => downVote(id)}>
      <ThumbDown />
    </IconButton>
  </div>
)

export default Votes
