import { Provider } from "react-redux";
import "./App.css";
import Root from "./Root";
import { getPosts } from "./Store/post.slice";
import { store } from "./Store/store";
import './variables.css';

const BASE_URL = "https://realtime-rebbit-backend.vercel.app/api";

store.dispatch(getPosts());

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export { BASE_URL };

export default App;