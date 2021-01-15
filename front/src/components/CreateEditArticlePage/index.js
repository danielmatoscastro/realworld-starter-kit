import React from 'react';
import PropTypes from 'prop-types';
import { DefaultPage } from 'components/DefaultPage';

export const CreateEditArticlePage = ({ onSubmitHandler, article }) => (
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

CreateEditArticlePage.defaultProps = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
};

CreateEditArticlePage.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default CreateEditArticlePage;
