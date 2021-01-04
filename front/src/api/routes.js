export const BASE_URL = 'https://conduit.productionready.io/api';

export const USERS_ROUTE = '/users';
export const USERS_LOGIN_ROUTE = '/users/login';

export const ARTICLES_ROUTE = '/articles';
export const ARTICLES_ROUTE_F = (slug) => `/articles/${slug}`;
export const FAVORITE_ROUTE_F = (slug) => `/articles/${slug}/favorite`;
export const COMMENTS_ROUTE_F = (slug) => `/articles/${slug}/comments`;

export const TAGS_ROUTE = '/tags';
