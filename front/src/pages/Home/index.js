import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  DefaultPage,
  CardArticle,
  Pagination,
  Tags,
} from 'components';
import { useUser } from 'hooks';
import { getRequest, ARTICLES_ROUTE, TAGS_ROUTE } from 'api';
import { HOME } from '../../routes';

const ARTICLES_PER_PAGE = 10;

export const Home = () => {
  const { user } = useUser();
  const [globalFeedActive, setGlobalFeedActive] = useState(true);
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const searchParams = {
      limit: ARTICLES_PER_PAGE,
      offset: (activePage - 1) * ARTICLES_PER_PAGE,
    };
    if (currentTag) {
      searchParams.tag = currentTag;
    }
    if (!globalFeedActive && !currentTag) {
      searchParams.author = user.username;
    }

    setLoading(true);
    setArticles([]);
    setArticlesCount(0);

    const data = await getRequest(ARTICLES_ROUTE, searchParams);

    setLoading(false);
    setArticles(data.articles);
    setArticlesCount(data.articlesCount);
  }, [globalFeedActive, activePage, currentTag]);

  useEffect(async () => {
    const data = await getRequest(TAGS_ROUTE);
    setTags(data.tags);
  }, []);

  return (
    <DefaultPage>
      <div className="home-page">

        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">

            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    {user.isLogged && (
                    <NavLink
                      className="nav-link"
                      to={HOME}
                      isActive={() => !currentTag && !globalFeedActive}
                      onClick={() => {
                        setGlobalFeedActive(false);
                        setCurrentTag(null);
                      }}
                    >
                      Your Feed
                    </NavLink>
                    )}
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={HOME}
                      isActive={() => !currentTag && globalFeedActive}
                      onClick={() => {
                        setGlobalFeedActive(true);
                        setCurrentTag(null);
                      }}
                    >
                      Global Feed
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    {currentTag && (
                    <NavLink
                      className="nav-link"
                      to={HOME}
                      onClick={(e) => e.preventDefault()}
                    >
                      {`# ${currentTag}`}
                    </NavLink>
                    )}
                  </li>
                </ul>
              </div>

              {loading && <div style={{ marginTop: '1em' }}>Loading articles...</div>}

              {articles.map(((article) => (
                <CardArticle
                  author={article.author}
                  createdAt={article.createdAt}
                  favoritesCount={article.favoritesCount}
                  slug={article.slug}
                  title={article.title}
                  description={article.description}
                  key={article.slug}
                />
              )))}

              {!loading && articles.length === 0 && <div style={{ marginTop: '1em' }}>No articles are here... yet.</div>}

              <Pagination
                pages={Math.ceil(articlesCount / ARTICLES_PER_PAGE)}
                activePage={activePage}
                onClick={(page) => setActivePage(page)}
              />

            </div>

            <Tags tags={tags} onClick={(tag) => setCurrentTag(tag)} />

          </div>
        </div>

      </div>
    </DefaultPage>
  );
};
export default Home;
