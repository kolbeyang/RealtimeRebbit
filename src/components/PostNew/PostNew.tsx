import React, { FC, useState } from 'react';
import { Post } from '../../Store/post.model';
import { createPost, selectIsLoading } from '../../Store/post.slice';
import { store } from '../../Store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


interface PostNewProps {}

const PostNew: FC<PostNewProps> = () => {

  const isLoading = useSelector(selectIsLoading);
  const [ postTitle , setPostTitle ] = useState("");  
  const [ postContent , setPostContent ] = useState("");  
  const navigate = useNavigate();

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    let post = {
      title: postTitle,
      content: postContent
    };
    navigate("/posts");
    store.dispatch(createPost(post));
  }
  return <div className="card">
    New Post
    <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Title:
            <input type="text" id="new-post-title-input" name="title" onChange={e => setPostTitle(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>Content:
            <input type="text" id="new-post-content-input" name="content" onChange={e => setPostContent(e.target.value)}/>
          </label>
        </div>
        <input type="submit" id="new-post-submit-button" value="Submit"></input>
      </form>
  </div>
};

export default PostNew;
