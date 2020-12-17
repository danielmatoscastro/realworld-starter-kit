export const SLUG = 'slug';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const SETTINGS = '/settings';
export const EDITOR = '/editor';
export const EDITOR_SLUG = `${EDITOR}/:${SLUG}`;
export const ARTICLE_SLUG = `/article/:${SLUG}`;
export const PROFILE_SLUG = `/profile/:${SLUG}`;
export const FAVORITES_SLUG = `${PROFILE_SLUG}/favorites`;
export const HOME = '/';

export const EDITOR_F = (slug) => `${EDITOR}/${slug}`;
export const ARTICLE_F = (slug) => `/article/${slug}`;
export const PROFILE_F = (slug) => `/profile/${slug}`;
export const FAVORITES_F = (slug) => `${PROFILE_F(slug)}/favorites`;
