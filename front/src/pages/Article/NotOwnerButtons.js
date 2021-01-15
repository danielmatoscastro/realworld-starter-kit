import React from 'react';
import PropTypes from 'prop-types';
import { FollowButton, FavoriteButton } from 'components';

export const NotOwnerButtons = ({ article, onClickFollow, onClickFavorite }) => {
  const { author } = article;

  return (
    <>
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
        slug={article.slug}
        onClickFavorite={onClickFavorite}
      >
        <span className="counter">
          {`${article.favorited ? 'Unfavorite' : 'Favorite'} Article (${article.favoritesCount})`}
        </span>
      </FavoriteButton>
    </>
  );
};

NotOwnerButtons.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape().isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  onClickFollow: PropTypes.func.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default NotOwnerButtons;
