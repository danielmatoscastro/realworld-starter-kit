import React from 'react';
import PropTypes from 'prop-types';

export const CommentInput = ({ addComment, user }) => (
  <form className="card comment-form" onSubmit={addComment}>
    <div className="card-block">
      <textarea className="form-control" placeholder="Write a comment..." rows="3" name="comment" />
    </div>
    <div className="card-footer">
      <img src={user.image} className="comment-author-img" alt="user" />
      <button type="submit" className="btn btn-sm btn-primary">
        Post Comment
      </button>
    </div>
  </form>
);

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  user: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentInput;
