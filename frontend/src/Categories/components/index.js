import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

const Categories = ({ categories, selected }) => (
  <div>
    <Link to="/">
      <RaisedButton label="All" secondary={!selected} />
    </Link>
    {categories.map(({ path, name }) => (
      <Link to={`/${path}`} key={path}>
        <RaisedButton label={name} secondary={selected === path} />
      </Link>
    ))}
  </div>
)

export default Categories
