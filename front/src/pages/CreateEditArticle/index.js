import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useUser, useAbortOnUnmount } from 'hooks';
import { DefaultPage } from 'components';
import { postRequest, ARTICLES_ROUTE } from 'api';
import { HOME, ARTICLE_F } from '../../routes';

export const CreateEditArticle = () => {
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
    <DefaultPage>
      <div className="editor-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={onSubmitHandler}>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="title" className="form-control form-control-lg" placeholder="Article Title" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="description" className="form-control" placeholder="What's this article about?" />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea name="body" className="form-control" rows="8" placeholder="Write your article (in markdown)" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="tagList" className="form-control" placeholder="Enter tags" />
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
export default CreateEditArticle;
