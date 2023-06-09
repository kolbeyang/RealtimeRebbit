import React, { FC } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../App";
import { Post } from "../../Store/post.model";
import { store } from "../../Store/store";
import { deletePost } from "../../Store/post.slice";
import { Card, Space, Button } from "antd";
import { Typography } from "antd";

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
      <Card data-test="post-card" className="card">
        <Text
          data-test="post-card-id"
          onClick={() => navigate("/posts/" + post._id)}
          style={{ color: "blue" }}
        >
          ID: {post._id}
        </Text>
        <Title level={4} data-test="post-card-title" className="card-title">
          {" "}
          {post.title}
        </Title>
        <p data-test="post-card-content">{post.content}</p>
        <div className="button-box">
          <Text data-test="post-card-comment-count" className="comment-count">
            {post.comments.length} Comments
          </Text>
          <Button
            data-test="post-card-edit-button"
            className="card-button card-button-edit"
            onClick={(e) => handleEdit(e)}
          >
            Edit
          </Button>
          <Button
            id="post-card-delete-buttons"
            data-test="post-card-delete-button"
            className="card-button card-button-delete"
            onClick={(e) => handleDelete(e)}
            danger
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
