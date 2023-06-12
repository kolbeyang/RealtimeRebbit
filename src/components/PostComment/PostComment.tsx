import moment from "moment";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Comment, Post } from "../../Store/post.model";
import {
  commentPost,
  selectAllPosts,
  selectIsLoading
} from "../../Store/post.slice";
import { store } from "../../Store/store";
import LoadingPage from "../LoadingPage/LoadingPage";
import './PostComment.css';

interface PostCommentProps { }

const PostComment: FC<PostCommentProps> = () => {
  const { id } = useParams();
  const [commentField, setCommentfield] = useState("");
  const navigate = useNavigate();

  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <LoadingPage/>;
  }

  const post = posts.find((post: Post) => post && post._id === id);

  if (!post) {
    return <LoadingPage/>;
  }
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("The comment field is ", commentField);
    let comment: Comment = {
      text: commentField,
      _id: post._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.dispatch(commentPost(comment));
  };

  return (
    <div className="bounding-box">
      <div className="post-comment-spacer"/>
      <Link className="back-button" to="/posts" >&lt; Back</Link>
      <h1 className="post-comment-title">{post.title}</h1>
      <p className="post-comment-date">Created {moment(post.createdAt).fromNow()}, updated {moment(post.updatedAt).fromNow()}</p>
      <p className="post-comment-content">{post.content}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="card create-comment-card">
          <input
            data-test="post-comment-input"
            placeholder="Share your thoughts..."
            className="comment-content comment-input"
            type="text"
            name="comment"
            onChange={(e) => setCommentfield(e.target.value)}
          />
          <input
            className="card-button post-comment-submit-button"
            data-test="post-comment-submit"
            type="submit"
            value="Submit"
          ></input>
        </div>
      </form>


      {post.comments.map((comment: Comment) => (
        <div className="card comment-card">
          <h3 className="comment-content">{comment.text}</h3>
          <p className="comment-date">{moment(comment.createdAt).fromNow()}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComment;
