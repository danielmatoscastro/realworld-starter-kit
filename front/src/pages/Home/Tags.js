import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRequest, TAGS_ROUTE } from 'api';
import { HOME } from '../../routes';

const Tags = ({ onClick }) => {
  const [tags, setTags] = useState([]);

  useEffect(async () => {
    const data = await getRequest(TAGS_ROUTE);
    setTags(data.tags);
  }, []);

  return (
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
};

Tags.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Tags;
