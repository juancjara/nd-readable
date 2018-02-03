import React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import fecha from 'fecha'

import Votes from 'components/Votes'

const View = ({
  author,
  body,
  id,
  onEdit,
  onRemove,
  timestamp,
  voteScore,
  downVote,
  upVote,
}) => (
  <div style={{ margin: '10px' }}>
    <Card>
      <CardHeader
        title={body}
        subtitle={`${author} - ${fecha.format(
          timestamp,
          'hh:mm:ss A YYYY/MM/DD'
        )}`}
      />
      <CardActions>
        <Votes
          id={id}
          upVote={upVote}
          downVote={downVote}
          voteScore={voteScore}
        />
        {/*
         * should I pass the comment ID in this component, or in the parent?
        */}
        <FlatButton label="Remove" onClick={() => onRemove(id)} />
        <FlatButton label="Edit" onClick={() => onEdit({ id, body })} />
      </CardActions>
    </Card>
  </div>
)

export default View
