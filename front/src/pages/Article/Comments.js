import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useUser } from 'hooks';
import { formatDate } from 'utils';
import { PROFILE_F } from '../../routes';

const Comments = ({ comments, deleteComment }) => {
  const { user } = useUser();

  return (
    comments.map((comment) => (
      <div className="card" key={comment.id}>
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <Link to={PROFILE_F(comment.author.username)} className="comment-author">
            <img src={comment.author.image} className="comment-author-img" alt="comment author" width="128px" height="128px" />
          </Link>
&nbsp;
          <Link to={PROFILE_F(comment.author.username)} className="comment-author">{comment.author.username}</Link>
          <span className="date-posted">{formatDate(comment.createdAt)}</span>
          {user.username === comment.author.username && (
          <span
            className="mod-options"
            role="button"
            tabIndex="0"
            onClick={deleteComment(comment.id)}
            onKeyUp={deleteComment(comment.id)}
          >
            <i className="ion-trash-a" />
          </span>
          )}
        </div>
      </div>
    ))
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comments;
