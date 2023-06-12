import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Post } from "../../Store/post.model";
import {
  selectAllPosts,
  selectErrorMessage,
  selectIsLoading,
} from "../../Store/post.slice";
import { ReactComponent as ReactLogo } from "../../assets/rebbit_image.svg";
import PostCard from "../PostCard/PostCard";
import LoadingPage from "../LoadingPage/LoadingPage";

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
    return <LoadingPage/>;
  }

  return (
    <>
      <div className="bounding-box">
        <div style={{height: "14vh"}}/>
        <div className="site-header">
          <h1 data-test="site heading" className="site-title">Realtime Rebbit</h1>
          <div style={{ height: "50px", width: "50px" }}>
            <ReactLogo />
          </div>
        </div>
        <div style={{height: "2vh"}}/>
        <button
          className="card create-new-post-button"
          data-test="create-new-post-button"
          onClick={() => navigate("/posts/new")}
        >
          Create a new post
        </button>
        {posts?.map((post: Post, index: number) => (
          <PostCard post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsView;
