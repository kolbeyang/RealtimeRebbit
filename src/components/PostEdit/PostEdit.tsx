import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAllPosts,
  selectIsLoading,
  updatePost,
} from "../../Store/post.slice";
import { store } from "../../Store/store";
import { Post } from "../../Store/post.model";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface PostEditProps {}

const PostEdit: FC<PostEditProps> = () => {
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectIsLoading);

  const { id } = useParams();
  const post = posts.find((post: Post) => post && post._id === id);

  const [state, setState] = useState({
    title: post?.title || "",
    content: post?.title || ""
  });
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  if (!post) return <div>Post not found</div>;

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const onSubmit = () => {
    let updatedPost = {
      _id: post._id,
      title: state.title,
      content: state.content,
    };
    store.dispatch(updatePost(updatedPost));
    navigate("/posts");
  };

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  return (
    <div className="card">
      <button onClick={() => navigate("/posts")}>Back</button>
      <h3>Edit Post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {errors.title && errors.title.type === "required" && (
            <p className="errorMsg">Title is required.</p>
          )}
          <label>
            Title:
            <input
              {...register("title", { required: true })}
              type="text"
              name="title"
              onChange={handleInputChange}
              value={state.title}
            />
          </label>
        </div>
        <div>
          {errors.content && errors.content.type === "required" && (
            <p className="errorMsg">Content is required.</p>
          )}
          <label>
            Content:
            <input
              {...register("content", { required: true })}
              type="text"
              name="content"
              onChange={handleInputChange}
              value={state.content}
            />
          </label>
        </div>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default PostEdit;
