import * as actions from './actions';

export const initialState = {
  loading: false,
  articles: [],
  articlesCount: 0,
  currentTag: null,
  activePage: 1,
  globalFeedActive: true,
};

export const reducer = (oldState, action) => {
  const {
    articles,
    articlesCount,
    currentTag,
    activePage,
  } = { ...oldState, ...action.payload };

  const oldWasUserFeed = !oldState.globalFeedActive && !oldState.currentTag;
  const oldWasGlobalFeed = oldState.globalFeedActive && !oldState.currentTag;
  const oldWasTag = !oldState.globalFeedActive && oldState.currentTag;

  switch (action.type) {
    case actions.LOADING:
      return {
        ...oldState,
        loading: true,
        articles: [],
        articlesCount: 0,
      };
    case actions.SET_PAGE:
      return {
        ...oldState,
        activePage,
      };
    case actions.FETCH_USER_FEED:
      return {
        ...initialState,
        globalFeedActive: false,
        loading: true,
      };
    case actions.FETCH_GLOBAL_FEED:
      return {
        ...initialState,
        loading: true,
      };
    case actions.SHOW_USER_FEED:
      return {
        ...initialState,
        articles,
        articlesCount,
        globalFeedActive: false,
        activePage: oldWasUserFeed ? activePage : 1,
      };
    case actions.SHOW_GLOBAL_FEED:
      return {
        ...initialState,
        articles,
        articlesCount,
        activePage: oldWasGlobalFeed ? activePage : 1,
      };
    case actions.FETCH_TAG:
      return {
        ...initialState,
        currentTag,
        loading: true,
        globalFeedActive: false,
      };
    case actions.SHOW_TAG:
      return {
        ...initialState,
        articles,
        articlesCount,
        currentTag,
        activePage: oldWasTag ? activePage : 1,
        globalFeedActive: false,
      };
    case actions.UPDATE_ARTICLE:
      return {
        ...oldState,
        articles: articles.map((article) => {
          if (article.slug !== action.payload.slug) {
            return article;
          }

          return action.payload;
        }),
      };
    default:
      return initialState;
  }
};
