import { connect } from 'react-redux'

import { getCategories } from 'Categories/ducks'
import Categories from 'Categories/components'

const mapState = state => ({
  categories: getCategories(state),
})

const mapDispatch = {}

export default connect(mapState, mapDispatch)(Categories)
