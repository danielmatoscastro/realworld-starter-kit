import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { HOME } from '../routes';
import DefaultPage from '../components/DefaultPage';
import CardArticle from '../components/CardArticle';
import Pagination from '../components/Pagination';
import Tags from '../components/Tags';

const ARTICLES_PER_PAGE = 10;
const BASE_URL = 'https://conduit.productionready.io/api';

const Home = () => {
  const { user } = useUser();
  const [globalFeedActive, setGlobalFeedActive] = useState(true);
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);

  useEffect(async () => {
    if (globalFeedActive) {
      const url = new URL(`${BASE_URL}/articles`);
      url.search = new URLSearchParams({
        limit: ARTICLES_PER_PAGE,
        offset: (activePage - 1) * ARTICLES_PER_PAGE,
      });

      if (currentTag) {
        url.searchParams.append('tag', currentTag);
      }

      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      setArticlesCount(data.articlesCount);
    }
  }, [globalFeedActive, activePage, currentTag]);

  useEffect(async () => {
    const url = new URL(`${BASE_URL}/tags`);
    const response = await fetch(url);
    const data = await response.json();
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
