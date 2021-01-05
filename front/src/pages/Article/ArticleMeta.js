import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';
import { FavoriteButton, FollowButton } from 'components';
import { PROFILE_F } from '../../routes';

const ArticleMeta = ({ article, onClickFollow, onClickFavorite }) => {
  const { author } = article;

  return (
    <div className="article-meta">
      <Link to={PROFILE_F(author.username)}><img src={author.image} alt="article author" /></Link>
      <div className="info">
        <Link to={PROFILE_F(author.username)} className="author">{author.username}</Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
      <FollowButton
        username={author.username}
        following={author.following}
        onClickFollow={onClickFollow}
      >
        <span>
          {`${author.following ? 'Unfollow' : 'Follow'} ${author.username}`}
        </span>
      </FollowButton>
&nbsp;&nbsp;
      <FavoriteButton
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
        slug={article.slug}
        onClickFavorite={onClickFavorite}
      >
        <span className="counter">
          {`${article.favorited ? 'Unfavorite' : 'Favorite'} Article (${article.favoritesCount})`}
        </span>
      </FavoriteButton>

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
