import React from 'react';
import PropTypes from 'prop-types';
import { PROFILE_F, ARTICLE_F } from '../../routes';
import { FavoriteButton } from '../FavoriteButton';

export const CardArticle = ({ article, onClickFavorite }) => {
  const {
    author,
    createdAt,
    favoritesCount,
    slug,
    title,
    description,
    favorited,
    tagList,
  } = article;
  const { username, image } = author;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={PROFILE_F(username)}><img src={image} alt="profile" /></a>
        <div className="info">
          <a href={PROFILE_F(username)} className="author">{username}</a>
          <span className="date">{createdAt}</span>
        </div>
        <FavoriteButton
          favorited={favorited}
          slug={slug}
          onClickFavorite={onClickFavorite}
          className="pull-xs-right"
        >
          <span>{favoritesCount}</span>
        </FavoriteButton>
      </div>
      <a href={ARTICLE_F(slug)} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            tagList.map((tag) => (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            ))
          }
        </ul>
      </a>
    </div>
  );
};

CardArticle.propTypes = {
  article: PropTypes.shape({
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
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default CardArticle;
