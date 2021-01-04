import React, { useEffect, useReducer } from 'react';
import {
  DefaultPage,
  CardArticle,
  Pagination,
} from 'components';
import { useUser } from 'hooks';
import { getRequest, ARTICLES_ROUTE } from 'api';
import { reducer, initialState } from 'pages/Home/reducer';
import Tags from 'pages/Home/Tags';
import Tab from 'pages/Home/Tab';
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
                  <Tab
                    text="Your Feed"
                    show={user.isLogged}
                    isActive={() => !currentTag && !globalFeedActive}
                    onClick={() => dispatch(doFetchUserFeed())}
                  />
                  <Tab
                    text="Global Feed"
                    isActive={() => !currentTag && globalFeedActive}
                    onClick={() => !globalFeedActive && dispatch(doFetchGlobalFeed())}
                  />
                  <Tab
                    text={`# ${currentTag}`}
                    show={!!currentTag}
                    onClick={(e) => e.preventDefault()}
                  />
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

            <Tags onClick={(tag) => dispatch(doFetchTag(tag))} />
          </div>
        </div>

      </div>
    </DefaultPage>
  );
};
export default Home;
