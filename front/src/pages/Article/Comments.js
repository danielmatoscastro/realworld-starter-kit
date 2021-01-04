import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';
import { PROFILE_F } from '../../routes';

const Comments = ({ comments }) => (
  comments.map((comment) => (
    <div className="card" key={comment.id}>
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={PROFILE_F(comment.author.username)} className="comment-author">
          <img src={comment.author.username} className="comment-author-img" alt="comment author" />
        </Link>
&nbsp;
        <Link to={PROFILE_F(comment.author.username)} className="comment-author">{comment.author.username}</Link>
        <span className="date-posted">{formatDate(comment.createdAt)}</span>
      </div>
    </div>
  ))
);

export default Comments;
