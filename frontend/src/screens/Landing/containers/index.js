import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { fetchCategories } from 'Categories/ducks'
import Categories from './CategoriesConnected'
import Posts from './Posts'

const items = [
  { label: 'score', value: 'voteScore' },
  { label: 'timestamp', value: 'timestamp' },
]

class Landing extends Component {
  state = { sortBy: null }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { sortBy } = this.state
    const categorySelected = this.props.match.params.category

    return (
      <div>
        <Categories selected={categorySelected} />
        <SelectField
          value={sortBy}
          floatingLabelText="Sort by"
          onChange={(e, index, sortBy) => this.setState({ sortBy })}
        >
          {items.map(item => (
            <MenuItem
              key={item.value}
              value={item.value}
              primaryText={item.label}
            />
          ))}
        </SelectField>
        <Posts category={categorySelected} sortBy={sortBy} />
      </div>
    )
  }
}

export default withRouter(connect(null, { fetchCategories })(Landing))
