import * as actions from 'pages/Home/actions';

export const doLoading = () => ({ type: actions.LOADING });

export const doSetPage = (activePage) => ({
  type: actions.SET_PAGE,
  payload: {
    activePage,
  },
});

export const doFetchUserFeed = () => ({ type: actions.FETCH_USER_FEED });

export const doFetchGlobalFeed = () => ({ type: actions.FETCH_GLOBAL_FEED });

export const doShowUserFeed = (articles, articlesCount) => ({
  type: actions.SHOW_USER_FEED,
  payload: {
    articles,
    articlesCount,
  },
});

export const doShowGlobalFeed = (articles, articlesCount) => ({
  type: actions.SHOW_GLOBAL_FEED,
  payload: {
    articles,
    articlesCount,
  },
});

export const doFetchTag = (currentTag) => ({
  type: actions.FETCH_TAG,
  payload: {
    currentTag,
  },
});

export const doShowTag = (articles, articlesCount, currentTag) => ({
  type: actions.SHOW_TAG,
  payload: {
    articles,
    articlesCount,
    currentTag,
  },
});

export const doUpdateArticle = (article) => ({
  type: actions.UPDATE_ARTICLE,
  payload: article,
});
