import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostsView from "./components/PostsView/PostsView";
import PostEdit from "./components/PostEdit/PostEdit";
import PostComment from "./components/PostComment/PostComment";
import PostNew from "./components/PostNew/PostNew";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsView />} />
        <Route path="posts">
          <Route path="" element={<PostsView />} />
          <Route path=":id">
            <Route path="edit" element={<PostEdit />} />
            <Route path="" element={<PostComment />} />
            <Route path="*" element={<div> Not found</div>} />
          </Route>
          <Route path="new" element={<PostNew />} />
          <Route path="*" element={<PostsView />} />
        </Route>
        <Route path="*" element={<div> Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
