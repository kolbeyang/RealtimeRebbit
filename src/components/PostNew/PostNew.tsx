import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, selectIsLoading } from "../../Store/post.slice";
import { store } from "../../Store/store";

interface PostNewProps {}

const PostNew: FC<PostNewProps> = () => {
  const isLoading = useSelector(selectIsLoading);
  const [state, setState] = useState({
    title: "",
    content: ""
  });
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const onSubmit = () => {

    let post = {
      title: state.title,
      content: state.content
    };
    navigate("/posts");
    store.dispatch(createPost(post));
  };

  return (
    <div className="card">
      New Post
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
              id="new-post-title-input"
              name="title"
              value={state.title}
              onChange={handleInputChange}
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
              id="new-post-content-input"
              name="content"
              value={state.content}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <input type="submit" id="new-post-submit-button" value="Submit"></input>
      </form>
    </div>
  );
};

export default PostNew;
