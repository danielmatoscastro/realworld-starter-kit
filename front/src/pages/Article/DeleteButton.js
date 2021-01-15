import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useUser, useAbortOnUnmount } from 'hooks';
import { deleteRequest, ARTICLES_ROUTE_F } from 'api';
import { HOME } from '../../routes';

const DeleteButton = () => {
  const { user } = useUser();
  const { slug } = useParams();
  const history = useHistory();
  const abortController = useAbortOnUnmount();

  const onClickHandler = async () => {
    try {
      await deleteRequest(ARTICLES_ROUTE_F(slug), user.token, abortController);
      history.push(HOME);
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  };

  return (
    <button type="button" className="btn btn-outline-danger btn-sm" onClick={onClickHandler}>
      <i className="ion-trash-a" />
      {' '}
      Delete Article
    </button>
  );
};

export default DeleteButton;
