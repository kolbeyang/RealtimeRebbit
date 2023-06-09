import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts, selectIsLoading, updatePost } from '../../Store/post.slice';
import { store } from '../../Store/store';
import { Post } from '../../Store/post.model';
import { useNavigate, useParams } from 'react-router-dom';


interface PostEditProps {}

const PostEdit: FC<PostEditProps> = () => {  
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectIsLoading);
  
  const { id }= useParams();
  const post = posts.filter((post: Post) => (post && post._id === id))[0];

  const [ postTitle , setPostTitle ] = useState(post.title || "");
  const [ postContent , setPostContent ] = useState(post.content || "");
  const navigate = useNavigate();


  if (isLoading) {
    return <h3>Loading...</h3>
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    let updatedPost = {
      _id: post._id,
      title: postTitle,
      content: postContent
    };
    store.dispatch(updatePost(updatedPost));
    navigate("/posts");
  }

  return <div className="card">
    <button onClick={() => navigate("/posts")}>Back</button>
    <h3>Edit Post</h3>
    <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Title:
            <input type="text" name="title" onChange={e => setPostTitle(e.target.value)} value={postTitle}/>
          </label>
        </div>
        <div>
          <label>Content:
            <input type="text" name="content" onChange={e => setPostContent(e.target.value)} value={postContent}/>
          </label>
        </div>
        <input type="submit" value="Submit"></input>
      </form>
  </div>
};

export default PostEdit;
