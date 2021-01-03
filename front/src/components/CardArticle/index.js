import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { postRequest, deleteRequest, FAVORITE_ROUTE_F } from 'api';
import { useUser } from 'hooks';
import { PROFILE_F, ARTICLE_F, LOGIN } from '../../routes';

export const CardArticle = ({
  author,
  createdAt,
  favoritesCount,
  slug,
  title,
  description,
  favorited,
  onClickFavorite,
}) => {
  const { user } = useUser();
  const history = useHistory();
  const { username, image } = author;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={PROFILE_F(username)}><img src={image} alt="profile" /></a>
        <div className="info">
          <a href={PROFILE_F(username)} className="author">{username}</a>
          <span className="date">{createdAt}</span>
        </div>
        <button
          type="button"
          className={`btn ${favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right`}
          onClick={async (e) => {
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
          }}
        >
          <i className="ion-heart" />
          {' '}
          {favoritesCount}
        </button>
      </div>
      <a href={ARTICLE_F(slug)} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
};

CardArticle.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default CardArticle;
