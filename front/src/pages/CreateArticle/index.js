import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useUser, useAbortOnUnmount } from 'hooks';
import { CreateEditArticlePage } from 'components';
import { postRequest, ARTICLES_ROUTE } from 'api';
import { HOME, ARTICLE_F } from '../../routes';

export const CreateArticle = () => {
  const history = useHistory();
  const { user } = useUser();
  const abortController = useAbortOnUnmount();

  if (!user.isLogged) {
    return <Redirect to={HOME} />;
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const payload = Array.from(e.target.elements)
        .filter((el) => el.name && el.value !== '')
        .reduce((formData, el) => ({ ...formData, [el.name]: el.value }), {});

      payload.tagList = payload.tagList.split(' ');

      const response = await postRequest(ARTICLES_ROUTE,
        { article: payload },
        user.token,
        abortController);

      history.push(ARTICLE_F(response.article.slug));
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  };

  return (
    <CreateEditArticlePage onSubmitHandler={onSubmitHandler} />
  );
};
export default CreateArticle;
