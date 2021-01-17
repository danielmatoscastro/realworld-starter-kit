import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getRequest, TAGS_ROUTE } from 'api';
import { useAbortOnUnmount, useEffectIgnoringAbortError } from 'hooks';
import { HOME } from '../../routes';

const Tags = ({ onClick }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const abortController = useAbortOnUnmount();

  useEffectIgnoringAbortError(async () => {
    setLoading(true);
    const data = await getRequest(TAGS_ROUTE, null, null, abortController);
    setTags(data.tags);
    setLoading(false);
  }, []);

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {loading && <div style={{ marginTop: '1em' }}>Loading tags...</div>}

          {!loading && tags.map((tag) => (
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
