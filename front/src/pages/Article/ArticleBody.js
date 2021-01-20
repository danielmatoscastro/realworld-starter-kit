import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

const ReactMarkdown = React.lazy(() => import('react-markdown'));

export const ArticleBody = React.memo(({ articleBody }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ReactMarkdown>
      {articleBody}
    </ReactMarkdown>
  </Suspense>
));

ArticleBody.propTypes = {
  articleBody: PropTypes.string.isRequired,
};

export default ArticleBody;
