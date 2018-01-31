import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const Categories = ({
  categories,
}) => (
  <div>
    {
      categories.map(({ path, name }) => 
        <Link to={`category/${path}`} key={path}>
          <RaisedButton label={name} />
        </Link>
      )
    }
  </div>
);

export default Categories;
