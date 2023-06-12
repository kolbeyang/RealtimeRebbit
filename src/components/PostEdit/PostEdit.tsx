import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAllPosts,
  selectIsLoading,
  updatePost,
} from "../../Store/post.slice";
import { store } from "../../Store/store";
import { Post } from "../../Store/post.model";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface PostEditProps {}

const PostEdit: FC<PostEditProps> = () => {
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectIsLoading);

  const { id } = useParams();
  const post = posts.find((post: Post) => post && post._id === id);

  const [state, setState] = useState({
    title: post?.title || "",
    content: post?.content || ""
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

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  return (
    <div className="bounding-box">
      <div className="sub-page-spacer"/>
      <Link className="back-button" to="/posts" >&lt; Back</Link>
      <h1 className="sub-page-title">Edit post</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {errors.title && errors.title.type === "required" && (
            <div className="errorMsg">Title is required.</div>
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
            <div className="errorMsg">Content is required.</div>
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
        <input type="submit" className="card-button standalone-button" id="new-post-submit-button" value="Save changes"></input>
      </form>

    </div>
  );
};

export default PostEdit;
