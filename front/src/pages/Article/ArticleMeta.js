import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';
import { useUser } from 'hooks';
import { OwnerButtons } from './OwnerButtons';
import { NotOwnerButtons } from './NotOwnerButtons';
import { PROFILE_F } from '../../routes';

const ArticleMeta = ({ article, onClickFollow, onClickFavorite }) => {
  const { user } = useUser();

  const { author } = article;
  const isOwner = author.username === user.username;

  return (
    <div className="article-meta">
      <Link to={PROFILE_F(author.username)}><img src={author.image} alt="article author" /></Link>
      <div className="info">
        <Link to={PROFILE_F(author.username)} className="author">{author.username}</Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>

      {isOwner
        ? (
          <OwnerButtons />
        )
        : (
          <NotOwnerButtons
            article={article}
            onClickFollow={onClickFollow}
            onClickFavorite={onClickFavorite}
          />
        )}

    </div>

  );
};

ArticleMeta.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape().isRequired,
    createdAt: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
  }).isRequired,
  onClickFollow: PropTypes.func.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default ArticleMeta;
