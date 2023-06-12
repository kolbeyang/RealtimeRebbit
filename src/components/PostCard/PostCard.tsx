import { Button, Typography } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../Store/post.model";
import { deletePost } from "../../Store/post.slice";
import { store } from "../../Store/store";

const { Title, Text } = Typography;

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = (props) => {
  const navigate = useNavigate();
  let post: Post = props.post;

  const handleDelete = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();

    store.dispatch(deletePost(post._id));
  };
  const handleEdit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/posts/" + post._id + "/edit");
  };

  return (
    <div>
      <div data-test="post-card" className="card post-card">
        <h2
          data-test="post-card-title" 
          className="card-title"
          onClick={() => navigate("/posts/" + post._id)}
          >
          {" "}
          {post.title}
        </h2>
        <p data-test="post-card-content">{post.content}</p>
        <div className="card-footer">
          <div className="comment-count-box">
            <label data-test="post-card-comment-count" className="comment-count">
              {post.comments.length} Comments
            </label>
          </div>
          <div className="button-box">
            <button
              data-test="post-card-edit-button"
              className="card-button card-button-edit"
              onClick={(e) => handleEdit(e)}
            >
              Edit
            </button>
            <button
              id="post-card-delete-button"
              data-test="post-card-delete-button"
              className="card-button card-button-delete"
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
