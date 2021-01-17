import React from 'react';
import PropTypes from 'prop-types';

export const TagList = ({
  tagList, showDeleteButton, deleteHandler, outline,
}) => (
  <>
    {tagList.map((tag) => (
      <span key={tag} className={`tag-default tag-pill ${outline ? 'tag-outline' : ''}`}>
        {showDeleteButton && (
        <i
          className="ion-close-round"
          onClick={deleteHandler(tag)}
          onKeyUp={deleteHandler(tag)}
          role="button"
          tabIndex="0"
          aria-label="delete tag"
        />
        )}
        {tag}
      </span>
    ))}
  </>
);

TagList.defaultProps = {
  showDeleteButton: false,
  deleteHandler: () => {},
  outline: false,
};

TagList.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  showDeleteButton: PropTypes.bool,
  deleteHandler: PropTypes.func,
  outline: PropTypes.bool,
};

export default TagList;
