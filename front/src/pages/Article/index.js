import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  getRequest, postRequest, ARTICLES_ROUTE_F, COMMENTS_ROUTE_F,
} from 'api';
import { DefaultPage } from 'components/DefaultPage';
import { useUser } from 'hooks';
import { formatDate } from 'utils';
import Comments from 'pages/Article/Comments';
import { PROFILE_F } from '../../routes';

export const Article = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const [article, setArticle] = useState({ author: {} });
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const response = await getRequest(ARTICLES_ROUTE_F(slug));
    setArticle(response.article);
  }, [slug]);

  useEffect(async () => {
    const response = await getRequest(COMMENTS_ROUTE_F(slug));
    setComments(response.comments);
  }, [slug]);

  const addComment = async (e) => {
    e.preventDefault();

    const response = await postRequest(COMMENTS_ROUTE_F(slug), {
      comment: {
        body: e.target.comment.value,
      },
    }, user.token);

    setComments([response.comment, ...comments]);
  };

  const { author } = article;
  return (
    <DefaultPage>
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{article.title}</h1>

            <div className="article-meta">
              <Link to={PROFILE_F(author.username)}><img src={author.image} alt="article author" /></Link>
              <div className="info">
                <Link to={PROFILE_F(author.username)} className="author">{author.username}</Link>
                <span className="date">{formatDate(article.createdAt)}</span>
              </div>
              <button type="button" className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp;
                {`Follow ${author.username}`}
                {' '}
                <span className="counter">(10)</span>
              </button>
      &nbsp;&nbsp;
              <button type="button" className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp;
                Favorite Post
                {' '}
                <span className="counter">(29)</span>
              </button>
            </div>

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
            <div className="article-meta">
              <Link to={PROFILE_F(author.username)}><img src={author.image} alt="author" /></Link>
              <div className="info">
                <Link to={PROFILE_F(author.username)} className="author">{author.username}</Link>
                <span className="date">{formatDate(article.createdAt)}</span>
              </div>

              <button type="button" className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp;
                {`Follow ${author.username}`}
                {' '}
                <span className="counter">(10)</span>
              </button>
      &nbsp;
              <button type="button" className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp;
                Favorite Post
                {' '}
                <span className="counter">(29)</span>
              </button>
            </div>
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

              <Comments comments={comments} />

            </div>

          </div>

        </div>

      </div>

    </DefaultPage>
  );
};

export default Article;
