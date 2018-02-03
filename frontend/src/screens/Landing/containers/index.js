import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchCategories } from 'Categories/ducks'
import Categories from './CategoriesConnected'
import Posts from './Posts'

class Landing extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categorySelected = this.props.match.params.category

    return (
      <div>
        <Categories selected={categorySelected} />
        <Posts category={categorySelected} />
      </div>
    )
  }
}

export default withRouter(connect(null, { fetchCategories })(Landing))
