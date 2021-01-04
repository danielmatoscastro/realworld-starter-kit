import React, { useState, useEffect, useReducer } from 'react';
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
import { reducer, initialState } from './reducer';
import {
  doFetchUserFeed,
  doFetchGlobalFeed,
  doLoading,
  doShowGlobalFeed,
  doShowTag,
  doShowUserFeed,
  doUpdateArticle,
  doSetPage,
  doFetchTag,
} from './actionCreators';

const ARTICLES_PER_PAGE = 10;

export const Home = () => {
  const { user } = useUser();
  const [tags, setTags] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    loading,
    articles,
    articlesCount,
    currentTag,
    activePage,
    globalFeedActive,
  } = state;

  useEffect(async () => {
    // let futureAction = SHOW_GLOBAL_FEED;
    let futureActionCreator = doShowGlobalFeed;

    const searchParams = {
      limit: ARTICLES_PER_PAGE,
      offset: (activePage - 1) * ARTICLES_PER_PAGE,
    };
    if (currentTag) {
      searchParams.tag = currentTag;
      futureActionCreator = doShowTag;
    }
    if (!globalFeedActive && !currentTag) {
      searchParams.author = user.username;
      futureActionCreator = doShowUserFeed;
    }

    dispatch(doLoading());

    const data = await getRequest(ARTICLES_ROUTE, searchParams, user.isLogged ? user.token : null);

    dispatch(futureActionCreator(data.articles, data.articlesCount, currentTag));
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
                      onClick={() => dispatch(doFetchUserFeed())}
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
                      onClick={() => !globalFeedActive && dispatch(doFetchGlobalFeed())}
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
                  article={article}
                  onClickFavorite={(articleUpdated) => dispatch(doUpdateArticle(articleUpdated))}
                  key={article.slug}
                />
              )))}

              {!loading && articles.length === 0 && <div style={{ marginTop: '1em' }}>No articles are here... yet.</div>}

              <Pagination
                pages={Math.ceil(articlesCount / ARTICLES_PER_PAGE)}
                activePage={activePage}
                onClick={(page) => dispatch(doSetPage(page))}
              />

            </div>

            <Tags
              tags={tags}
              onClick={(tag) => dispatch(doFetchTag(tag))}
            />

          </div>
        </div>

      </div>
    </DefaultPage>
  );
};
export default Home;
