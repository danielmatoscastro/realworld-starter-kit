import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAbortOnUnmount, useEffectIgnoringAbortError, usePrevious } from 'hooks';
import { getRequest } from 'api';
import { CardArticle } from 'components/CardArticle';
import { Pagination } from 'components/Pagination';

const ARTICLES_PER_PAGE = 10;

export const Tab = ({ tab }) => {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const previousTabName = usePrevious(tab.name);
  const abortController = useAbortOnUnmount();

  useEffectIgnoringAbortError(async () => {
    if (previousTabName !== tab.name && activePage !== 1) {
      setActivePage(1);
    } else {
      setLoading(true);

      const response = await getRequest(tab.endpoint,
        {
          ...tab.searchParams,
          limit: ARTICLES_PER_PAGE,
          offset: (activePage - 1) * ARTICLES_PER_PAGE,
        },
        null,
        abortController);

      setArticles(response.articles);
      setArticlesCount(response.articlesCount);
      setLoading(false);
    }
  }, [tab, activePage]);

  const onClickFavorite = (updatedArticle) => articles.map((article) => {
    if (article.slug !== updatedArticle.slug) {
      return article;
    }

    return updatedArticle;
  });

  const hasArticles = !loading && articles.length !== 0;
  const hasNoArticles = !loading && articles.length === 0;

  return (
    <>
      {hasArticles && articles.map((article) => (
        <CardArticle
          key={article.slug}
          article={article}
          onClickFavorite={onClickFavorite}
        />
      ))}

      {hasNoArticles && <div style={{ marginTop: '1em' }}>No articles are here... yet.</div>}

      {loading && <div style={{ marginTop: '1em' }}>Loading articles...</div>}

      {hasArticles && (
      <Pagination
        pages={Math.ceil(articlesCount / ARTICLES_PER_PAGE)}
        activePage={activePage}
        onClick={(page) => setActivePage(page)}
      />
      )}
    </>
  );
};

Tab.propTypes = {
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    searchParams: PropTypes.shape().isRequired,
  }).isRequired,
};

export default Tab;
