import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className="bounding-box">
      <div className="sub-page-spacer"/>
      <Link className="back-button" to="/posts" >&lt; Back</Link>
      <h1 className="sub-page-title">New post</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {errors.title && errors.title.type === "required" && (
            <p className="errorMsg">Title is required.</p>
          )}
          <input
            {...register("title", { required: true })}
            type="text"
            id="new-post-title-input"
            name="title"
            className="default-input title-input"
            placeholder="Title"
            value={state.title}
            onChange={handleInputChange}
            />
        </div>
        <div>
          {errors.content && errors.content.type === "required" && (
            <p className="errorMsg">Content is required.</p>
          )}
          <textarea
            {...register("content", { required: true })}
            id="new-post-content-input"
            name="content"
            className="default-input content-input"
            placeholder="Write something interesting..."
            value={state.content}
            onChange={handleInputChange}
          />

        </div>
        <input type="submit" className="card-button standalone-button" id="new-post-submit-button" value="Create post"></input>
      </form>

    </div>
  );
};

export default PostNew;
