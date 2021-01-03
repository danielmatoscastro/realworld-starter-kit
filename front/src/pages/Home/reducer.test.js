import deepFreeze from 'deep-freeze';
import { reducer, initialState } from './reducer';
import * as actions from './actions';

describe('Home reducer', () => {
  it('should return { loading: true, articles: [], articlesCount: 0 } when action.type: LOADING', () => {
    const oldState = deepFreeze(initialState);
    const loadingState = reducer(oldState, { type: actions.LOADING });

    expect(loadingState.loading).toEqual(true);
    expect(loadingState.articles).toEqual([]);
    expect(loadingState.articlesCount).toEqual(0);
  });

  it('should set state.activePage as action.payload.activePage value when action.type: SET_PAGE', () => {
    const oldState = deepFreeze({ ...initialState, activePage: 0 });
    const action = {
      type: actions.SET_PAGE,
      payload: {
        activePage: 1,
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.activePage).toEqual(action.payload.activePage);
  });

  it('should return { loading: true, globalFeedActive: false, currentTag: null } when action.type: FETCH_USER_FEED', () => {
    const oldState = deepFreeze({
      ...initialState,
      loading: false,
      globalFeedActive: true,
      currentTag: 'some-value',
    });
    const action = { type: actions.FETCH_USER_FEED };

    const newState = reducer(oldState, action);

    expect(newState.loading).toEqual(true);
    expect(newState.globalFeedActive).toEqual(false);
    expect(newState.currentTag).toBeNull();
  });

  it('should return { loading: true, globalFeedActive: true, currentTag: null } when action.type: FETCH_GLOBAL_FEED', () => {
    const oldState = deepFreeze({
      ...initialState,
      loading: false,
      globalFeedActive: false,
      currentTag: 'some-value',
    });
    const action = { type: actions.FETCH_GLOBAL_FEED };

    const newState = reducer(oldState, action);

    expect(newState.loading).toEqual(true);
    expect(newState.globalFeedActive).toEqual(true);
    expect(newState.currentTag).toBeNull();
  });

  it('should set payload into state and return { loading: false, globalFeedActive: false, currentTag: null } when action.type: SHOW_USER_FEED', () => {
    const oldState = deepFreeze({
      ...initialState,
      articles: [],
      articlesCount: 0,
      loading: true,
      globalFeedActive: true,
      currentTag: 'some-value',
    });
    const action = {
      type: actions.SHOW_USER_FEED,
      payload: {
        articles: ['article-1', 'article-2'],
        articlesCount: 2,
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.articles).toEqual(action.payload.articles);
    expect(newState.articlesCount).toEqual(action.payload.articlesCount);
    expect(newState.loading).toEqual(false);
    expect(newState.globalFeedActive).toEqual(false);
    expect(newState.currentTag).toBeNull();
  });

  it('should return { activePage: 1 } when receiving action.type: SHOW_USER_FEED from other feed at other page.', () => {
    // oldState corresponds to a valid SHOW_GLOBAL_FEED at page 2.
    const oldState = deepFreeze({
      ...initialState,
      articles: ['article-1', 'article-2'],
      articlesCount: 2,
      activePage: 2,
      loading: false,
      globalFeedActive: true,
      currentTag: null,
    });
    const action = {
      type: actions.SHOW_USER_FEED,
      payload: {
        articles: ['1', '2', '3'],
        articlesCount: 3,
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.activePage).toEqual(1);
  });

  it('should return { activePage: oldState.activePage } when receiving action.type: SHOW_USER_FEED from user feed.', () => {
    // oldState corresponds to a valid SHOW_USER_FEED at page 2.
    const oldState = deepFreeze({
      ...initialState,
      articles: ['article-1', 'article-2'],
      articlesCount: 2,
      activePage: 2,
      loading: false,
      globalFeedActive: false,
      currentTag: null,
    });
    const action = {
      type: actions.SHOW_USER_FEED,
      payload: {
        articles: ['1', '2', '3'],
        articlesCount: 3,
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.activePage).toEqual(oldState.activePage);
  });

  it('should set payload into state and return { loading: false, globalFeedActive: true, currentTag: null } when action.type: SHOW_GLOBAL_FEED', () => {
    const oldState = deepFreeze({
      ...initialState,
      articles: [],
      articlesCount: 0,
      loading: true,
      globalFeedActive: false,
      currentTag: 'some-value',
    });
    const action = {
      type: actions.SHOW_GLOBAL_FEED,
      payload: {
        articles: ['article-1', 'article-2'],
        articlesCount: 2,
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.articles).toEqual(action.payload.articles);
    expect(newState.articlesCount).toEqual(action.payload.articlesCount);
    expect(newState.loading).toEqual(false);
    expect(newState.globalFeedActive).toEqual(true);
    expect(newState.currentTag).toBeNull();
  });

  it('should return { activePage: 1 } when receiving action.type: SHOW_GLOBAL_FEED from other feed at other page.', () => {
    // oldState corresponds to a valid SHOW_USER_FEED at page 2.
    const oldState = deepFreeze({
      ...initialState,
      articles: ['article-1', 'article-2'],
      articlesCount: 2,
      activePage: 2,
      loading: false,
      globalFeedActive: false,
      currentTag: null,
    });
    const action = {
      type: actions.SHOW_GLOBAL_FEED,
      payload: {
        articles: ['1', '2', '3'],
        articlesCount: 3,
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.activePage).toEqual(1);
  });

  it('should return { activePage: oldState.activePage } when receiving action.type: SHOW_GLOBAL_FEED from global feed.', () => {
    // oldState corresponds to a valid SHOW_GLOBAL_FEED at page 2.
    const oldState = deepFreeze({
      ...initialState,
      articles: ['article-1', 'article-2'],
      articlesCount: 2,
      activePage: 2,
      loading: false,
      globalFeedActive: true,
      currentTag: null,
    });
    const action = {
      type: actions.SHOW_GLOBAL_FEED,
      payload: {
        articles: ['1', '2', '3'],
        articlesCount: 3,
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.activePage).toEqual(oldState.activePage);
  });

  it('should return { loading: true, globalFeedActive: false, currentTag: action.payload.currentTag } when action.type: FETCH_TAG', () => {
    const oldState = deepFreeze({
      ...initialState,
      loading: false,
      globalFeedActive: true,
      currentTag: null,
    });
    const action = {
      type: actions.FETCH_TAG,
      payload: {
        currentTag: 'some-tag',
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.loading).toEqual(true);
    expect(newState.globalFeedActive).toEqual(false);
    expect(newState.currentTag).toEqual(action.payload.currentTag);
  });

  it('should set payload into state and return { loading: false, globalFeedActive: false, currentTag: action.payload.currentTag } when action.type: SHOW_TAG', () => {
    const oldState = deepFreeze({
      ...initialState,
      articles: [],
      articlesCount: 0,
      loading: true,
      globalFeedActive: true,
      currentTag: null,
    });
    const action = {
      type: actions.SHOW_TAG,
      payload: {
        articles: ['article-1', 'article-2'],
        articlesCount: 2,
        currentTag: 'some-tag',
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.articles).toEqual(action.payload.articles);
    expect(newState.articlesCount).toEqual(action.payload.articlesCount);
    expect(newState.loading).toEqual(false);
    expect(newState.globalFeedActive).toEqual(false);
    expect(newState.currentTag).toEqual(action.payload.currentTag);
  });

  it('should return { activePage: 1 } when receiving action.type: SHOW_TAG from other feed at other page.', () => {
    // oldState corresponds to a valid SHOW_GLOBAL_FEED at page 2.
    const oldState = deepFreeze({
      ...initialState,
      articles: ['article-1', 'article-2'],
      articlesCount: 2,
      activePage: 2,
      loading: false,
      globalFeedActive: true,
      currentTag: null,
    });
    const action = {
      type: actions.SHOW_TAG,
      payload: {
        articles: ['1', '2', '3'],
        articlesCount: 3,
        currentTag: 'some-tag',
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.activePage).toEqual(1);
  });

  it('should return { activePage: oldState.activePage } when receiving action.type: SHOW_TAG from tag.', () => {
    // oldState corresponds to a valid SHOW_TAG at page 2.
    const oldState = deepFreeze({
      ...initialState,
      articles: ['article-1', 'article-2'],
      articlesCount: 2,
      activePage: 2,
      loading: false,
      globalFeedActive: false,
      currentTag: 'some-tag',
    });
    const action = {
      type: actions.SHOW_TAG,
      payload: {
        articles: ['1', '2', '3'],
        articlesCount: 3,
        currentTag: 'some-other-tag',
      },
    };

    const newState = reducer(oldState, action);

    expect(newState.activePage).toEqual(oldState.activePage);
  });

  it('should update article with slug action.payload.slug when receiving action.type: UPDATE_ARTICLE', () => {
    const oldState = deepFreeze({
      ...initialState,
      articles: [
        { title: 'article-1', slug: 'slug-1', favoritesCount: 1 },
        { title: 'article-2', slug: 'slug-2', favoritesCount: 2 },
      ],
      articlesCount: 2,
    });
    const action = {
      type: actions.UPDATE_ARTICLE,
      payload: {
        title: 'article-1-again',
        slug: 'slug-1',
        favoritesCount: 0,
      },
    };

    const newState = reducer(oldState, action);

    const articleUpdated = newState.articles.find(
      (article) => article.slug === action.payload.slug,
    );
    expect(articleUpdated.title).toEqual(action.payload.title);
    expect(articleUpdated.favoritesCount).toEqual(action.payload.favoritesCount);
  });
});
