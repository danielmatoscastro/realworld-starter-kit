import React from 'react';
import PropTypes from 'prop-types';
import { PROFILE_F, ARTICLE_F } from '../../routes';

export const CardArticle = ({
  author,
  createdAt,
  favoritesCount,
  slug,
  title,
  description,
}) => {
  const { username, image } = author;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={PROFILE_F(username)}><img src={image} alt="profile" /></a>
        <div className="info">
          <a href={PROFILE_F(username)} className="author">{username}</a>
          <span className="date">{createdAt}</span>
        </div>
        <button type="button" className="btn btn-outline-primary btn-sm pull-xs-right">
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
};

export default CardArticle;
