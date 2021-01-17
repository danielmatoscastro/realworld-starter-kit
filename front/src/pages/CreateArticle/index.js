import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useUser, useAbortOnUnmount } from 'hooks';
import { CreateEditArticlePage } from 'components';
import { postRequest, ARTICLES_ROUTE } from 'api';
import { HOME, ARTICLE_F } from '../../routes';

export const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    description: '',
    body: '',
    tagList: [],
  });
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const { user } = useUser();
  const abortController = useAbortOnUnmount();

  const onClickHandler = async () => {
    try {
      const response = await postRequest(ARTICLES_ROUTE,
        { article },
        user.token,
        abortController);

      if (response.article) {
        history.push(ARTICLE_F(response.article.slug));
      } else {
        setErrors(response.errors);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  };

  if (!user.isLogged) {
    return <Redirect to={HOME} />;
  }

  return (
    <CreateEditArticlePage
      onClickHandler={onClickHandler}
      article={article}
      setArticle={setArticle}
      errors={errors}
    />
  );
};
export default CreateArticle;
