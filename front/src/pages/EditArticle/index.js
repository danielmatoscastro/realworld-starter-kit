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
  const history = useHistory();
  const { slug } = useParams();
  const { user } = useUser();
  const abortController = useAbortOnUnmount();

  useEffectIgnoringAbortError(async () => {
    const response = await getRequest(ARTICLES_ROUTE_F(slug), null, null, abortController);
    setArticle(response.article);
  }, []);

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

      const response = await putRequest(ARTICLES_ROUTE_F(slug),
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
    <CreateEditArticlePage onSubmitHandler={onSubmitHandler} article={article} />
  );
};

export default EditArticle;
