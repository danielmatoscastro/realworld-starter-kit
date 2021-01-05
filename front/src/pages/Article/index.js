import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  getRequest,
  postRequest,
  deleteRequest,
  ARTICLES_ROUTE_F,
  COMMENTS_ROUTE_F,
  COMMENTS_DELETE_ROUTE_F,
} from 'api';
import { DefaultPage } from 'components/DefaultPage';
import { useUser, useAbortOnUnmount, useEffectIgnoringAbortError } from 'hooks';
import Comments from 'pages/Article/Comments';
import ArticleMeta from 'pages/Article/ArticleMeta';

export const Article = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const abortController = useAbortOnUnmount();
  const [article, setArticle] = useState({
    createdAt: new Date().toString(),
    slug: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      following: false,
    },
  });
  const [comments, setComments] = useState([]);

  useEffectIgnoringAbortError(async () => {
    const response = await getRequest(ARTICLES_ROUTE_F(slug), null, null, abortController);

    setArticle(response.article);
  }, [slug]);

  useEffectIgnoringAbortError(async () => {
    const response = await getRequest(COMMENTS_ROUTE_F(slug), null, null, abortController);

    setComments(response.comments);
  }, [slug]);

  const addComment = async (e) => {
    try {
      e.preventDefault();

      const response = await postRequest(COMMENTS_ROUTE_F(slug), {
        comment: {
          body: e.target.comment.value,
        },
      }, user.token, abortController);

      setComments([response.comment, ...comments]);
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  };

  const deleteComment = (id) => async () => {
    try {
      await deleteRequest(COMMENTS_DELETE_ROUTE_F(slug, id), user.token, abortController);

      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  };

  const { author } = article;
  return (
    <DefaultPage>
      <div className="article-page">

        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta
              article={article}
              onClickFollow={() => setArticle({
                ...article,
                author: { ...author, following: !author.following },
              })}
              onClickFavorite={(updatedArticle) => setArticle(updatedArticle)}
            />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <ReactMarkdown>
                {article.body}
              </ReactMarkdown>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <ArticleMeta
              article={article}
              onClickFollow={() => setArticle({
                ...article,
                author: { ...author, following: !author.following },
              })}
              onClickFavorite={(updatedArticle) => setArticle(updatedArticle)}
            />
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form" onSubmit={addComment}>
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows="3" name="comment" />
                </div>
                <div className="card-footer">
                  <img src={user.image} className="comment-author-img" alt="user" />
                  <button type="submit" className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>

              <Comments comments={comments} deleteComment={deleteComment} />

            </div>
          </div>
        </div>
      </div>

    </DefaultPage>
  );
};

export default Article;
