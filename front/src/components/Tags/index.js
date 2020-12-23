import React from 'react';
import PropTypes from 'prop-types';
import { HOME } from '../../routes';

export const Tags = ({ tags, onClick }) => (
  <div className="col-md-3">
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map((tag) => (
          <a
            href={HOME}
            className="tag-pill tag-default"
            key={tag}
            onClick={(e) => {
              e.preventDefault();
              onClick(tag);
            }}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tags;
