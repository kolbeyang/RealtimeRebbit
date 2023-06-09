import React, { FC, useState } from "react";
import {
  selectAllPosts,
  selectIsLoading,
  selectErrorMessage,
} from "../../Store/post.slice";
import { useSelector } from "react-redux";
import { store } from "../../Store/store";
import { getPosts } from "../../Store/post.slice";
import { Post } from "../../Store/post.model";
import { useNavigate } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import { ReactComponent as ReactLogo } from "../../assets/rebbit_image.svg";
import { Card, Space, Button } from "antd";

interface PostsViewProps {}

const PostsView: FC<PostsViewProps> = () => {
  const posts = useSelector(selectAllPosts);
  // const postsSorted = [...posts]
  // postsSorted.sort( (postA, postB) => {
  //   if (postA.updatedAt && postB.updatedAt) {
  //     console.log("sorting...")
  //     return +postB.updatedAt - +postA.updatedAt;
  //   } else return 1;
  // } )

  // console.log(postsSorted);

  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const navigate = useNavigate();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <div className="bounding-box">
        <div className="site-header">
          <div style={{ height: "40px", width: "40px" }}>
            <ReactLogo />
          </div>
          <h3 data-test="site heading">Realtime Rebbit</h3>
          <button
            data-test="create-new-post-button"
            onClick={() => navigate("/posts/new")}
          >
            Create a new post
          </button>
        </div>
        <Space direction="vertical" size="middle" className="space">
          {posts?.map((post: Post, index: number) => (
            <PostCard post={post} />
          ))}
        </Space>
      </div>
    </>
  );
};

export default PostsView;
