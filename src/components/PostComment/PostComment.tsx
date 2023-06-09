import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../App';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { commentPost, selectAllPosts, selectIsLoading, updatePost } from '../../Store/post.slice';
import { Post, Comment } from '../../Store/post.model';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { store } from '../../Store/store';


interface PostCommentProps {}

const PostComment: FC<PostCommentProps> = () => {
  const { id }= useParams();
  const [ commentField , setCommentfield ] = useState("");
  const navigate = useNavigate();


  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  const post = posts.filter((post: Post) => (post && post._id === id))[0];
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    console.log("The comment field is ", commentField)
    let comment : Comment = {
      text: commentField,
      _id: post._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    store.dispatch(commentPost(comment));
  }

  return <>
    <div className="card">
      <button onClick={() => navigate("/posts")}>Back</button>
      <h3>View Post</h3>
      <h3>ID: {post._id}</h3>
      <h3>TITLE: {post.title}</h3>
      <h3>CONTENT: {post.content}</h3>
      <h3>COMMENT COUNT: {post.comments.length}</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Comment:
          <input data-test="post-comment-input" type="text" name="comment" onChange={e => setCommentfield(e.target.value)}/>
        </label>
        <input data-test="post-comment-submit" type="submit" value="Submit"></input>
      </form>
    </div>


    {post.comments.map( (comment: Comment) => (
      <div className="card">
        COMMENT:
        <h3>CONTENT: {comment.text}</h3>
        <h3>CREATED AT: {comment.createdAt.toString()}</h3>
      </div>
    )) }
  </>;
}

export default PostComment;
