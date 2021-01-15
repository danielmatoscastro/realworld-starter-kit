import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useUser, useAbortOnUnmount, useEffectIgnoringAbortError } from 'hooks';
import { DefaultPage } from 'components';
import { getRequest, putRequest, ARTICLES_ROUTE_F } from 'api';
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
    <DefaultPage>
      <div className="editor-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={onSubmitHandler}>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="title" className="form-control form-control-lg" placeholder="Article Title" defaultValue={article.title} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="description" className="form-control" placeholder="What's this article about?" defaultValue={article.description} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea name="body" className="form-control" rows="8" placeholder="Write your article (in markdown)" defaultValue={article.body} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="tagList" className="form-control" placeholder="Enter tags" defaultValue={article.tagList.reduce((acc, tag) => `${acc} ${tag}`, '')} />
                    <div className="tag-list" />
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    </DefaultPage>
  );
};

export default EditArticle;
