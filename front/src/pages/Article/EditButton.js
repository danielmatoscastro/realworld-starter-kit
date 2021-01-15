import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { EDITOR_F } from '../../routes';

const EditButton = () => {
  const { slug } = useParams();

  return (
    <Link to={EDITOR_F(slug)} className="btn btn-outline-secondary btn-sm">
      <i className="ion-edit" />
      {' '}
      Edit Article
    </Link>
  );
};

export default EditButton;
