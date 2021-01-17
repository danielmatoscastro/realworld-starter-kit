import React from 'react';
import PropTypes from 'prop-types';
import { DefaultPage } from 'components/DefaultPage';
import { ErrorList } from 'components/ErrorList';

const SPACE_KEY_CODE = 32;

export const CreateEditArticlePage = ({
  onClickHandler,
  article,
  setArticle,
  errors,
}) => {
  const onKeyUpTagList = (e) => {
    if (e.keyCode === SPACE_KEY_CODE) {
      const newTag = e.target.value.trim();
      const oldTags = article.tagList.filter((tag) => tag !== newTag);

      setArticle({ ...article, tagList: [...oldTags, newTag] });
      e.target.value = '';
    }
  };

  const deleteTag = (deletedTag) => () => {
    setArticle({
      ...article,
      tagList: article.tagList.filter((tag) => tag !== deletedTag),
    });
  };

  const onChangeHandler = (fieldName) => (e) => {
    setArticle({
      ...article,
      [fieldName]: e.target.value,
    });
  };

  return (
    <DefaultPage>
      <div className="editor-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-10 offset-md-1 col-xs-12">
              { errors && (
              <ErrorList
                errors={errors}
                possibleErrorFields={[
                  'title',
                  'description',
                  'body',
                ]}
              />
              )}

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="title" className="form-control form-control-lg" placeholder="Article Title" value={article.title} onChange={onChangeHandler('title')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="description" className="form-control" placeholder="What's this article about?" value={article.description} onChange={onChangeHandler('description')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea name="body" className="form-control" rows="8" placeholder="Write your article (in markdown)" defaultValue={article.body} onChange={onChangeHandler('body')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="tagList" className="form-control" placeholder="Enter tags" onKeyUp={onKeyUpTagList} />
                    <div className="tag-list">
                      {article.tagList.map((tag) => (
                        <span key={tag} className="tag-default tag-pill">
                          <i
                            className="ion-close-round"
                            onClick={deleteTag(tag)}
                            onKeyUp={deleteTag(tag)}
                            role="button"
                            tabIndex="0"
                            aria-label="delete tag"
                          />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={onClickHandler}>
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

CreateEditArticlePage.defaultProps = {
  errors: null,
};

CreateEditArticlePage.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setArticle: PropTypes.func.isRequired,
  errors: PropTypes.shape(),
};

export default CreateEditArticlePage;
