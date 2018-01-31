import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../../Categories/ducks';
import Categories from './CategoriesConnected';
import Posts from './Posts';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <Categories />
        <Posts />
      </div>
    );
  }
}

export default connect(null, { fetchCategories })(Landing);
