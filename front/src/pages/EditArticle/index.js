import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useUser, useAbortOnUnmount, useEffectIgnoringAbortError } from 'hooks';
import { getRequest, putRequest, ARTICLES_ROUTE_F } from 'api';
import { CreateEditArticlePage } from 'components';
import { HOME, ARTICLE_F } from '../../routes';

export const EditArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    description: '',
    body: '',
    tagList: [],
  });
  const [errors, setErros] = useState(null);
  const history = useHistory();
  const { slug } = useParams();
  const { user } = useUser();
  const abortController = useAbortOnUnmount();

  useEffectIgnoringAbortError(async () => {
    const response = await getRequest(ARTICLES_ROUTE_F(slug), null, null, abortController);
    setArticle(response.article);
  }, []);

  const onClickHandler = async () => {
    try {
      const response = await putRequest(ARTICLES_ROUTE_F(slug),
        { article },
        user.token,
        abortController);

      if (response.article) {
        history.push(ARTICLE_F(response.article.slug));
      } else {
        setErros(response.errors);
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

export default EditArticle;
