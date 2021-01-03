import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { postRequest, deleteRequest, FAVORITE_ROUTE_F } from 'api';
import { useUser } from 'hooks';
import { LOGIN } from '../../routes';

const FavoriteButton = ({
  favorited,
  favoritesCount,
  slug,
  onClickFavorite,
}) => {
  const { user } = useUser();
  const history = useHistory();

  const onClickHandler = async (e) => {
    e.preventDefault();
    if (!user.isLogged) {
      return history.push(LOGIN);
    }

    let data = null;
    if (favorited) {
      data = await deleteRequest(FAVORITE_ROUTE_F(slug), user.token);
    } else {
      data = await postRequest(FAVORITE_ROUTE_F(slug), null, user.token);
    }

    return onClickFavorite(data.article);
  };

  return (
    <button
      type="button"
      className={`btn ${favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right`}
      onClick={onClickHandler}
    >
      <i className="ion-heart" />
      {' '}
      {favoritesCount}
    </button>
  );
};

FavoriteButton.propTypes = {
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default FavoriteButton;
